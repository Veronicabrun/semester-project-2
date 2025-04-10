import { API_KEY, API_BASE_URL, PROFILE_ENDPOINT } from "../config/constants.js";
import { retrieveFromLocalStorage } from "../utilities/localStorage.js";

const container = document.querySelector("#listing-container");
const loadMoreBtn = document.querySelector("#loadMoreBtn");

const username = retrieveFromLocalStorage("username");
const accessToken = retrieveFromLocalStorage("accessToken");

let userListings = [];
let otherListings = [];
let showAll = false;

function formatTimeLeft(endsAt) {
  const now = new Date();
  const end = new Date(endsAt);
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

async function fetchUserListings() {
  if (!accessToken || !username) {
    userListings = [];
    await fetchOtherListings();
    return;
  }

  try {
    const response = await fetch(
      `${PROFILE_ENDPOINT(username)}/listings?_sort=created&sortOrder=desc&_bids=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );
    const { data } = await response.json();
    userListings = data.slice(0, 9);
    await fetchOtherListings();
  } catch (error) {
    console.error("Feil ved henting av brukerens auksjoner:", error);
  }
}

async function fetchOtherListings() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auction/listings?_sort=created&sortOrder=desc&_bids=true&_seller=true&limit=100`,
      {
        headers: {
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    const { data } = await response.json();
    console.log("Alle auksjoner:", data);

    if (username) {
      otherListings = data.filter((listing) => listing.seller?.name !== username);
    } else {
      otherListings = data;
    }

    renderListings();
  } catch (error) {
    console.error("Feil ved henting av andres auksjoner:", error);
  }
}

export function renderListings(customListings = null) {
    const messageElement = document.getElementById("noResultsMessage");
    container.innerHTML = "";
  
    const listingsToRender = customListings
      ? customListings
      : showAll
      ? [...userListings, ...otherListings]
      : userListings.length > 0
      ? userListings
      : otherListings.slice(0, 9);
  
    // Vis/skjul meldingen
    if (messageElement) {
      if (listingsToRender.length === 0) {
        messageElement.classList.remove("d-none");
      } else {
        messageElement.classList.add("d-none");
      }
    }
  
    listingsToRender.forEach((listing) => {
      const image =
        listing.media?.[0]?.url ||
        "https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg";
      const alt = listing.media?.[0]?.alt || listing.title;
      const endsAt = listing.endsAt;
  
      const bids = listing.bids || [];
      const highestBid = bids.length
        ? Math.max(...bids.map((bid) => bid.amount))
        : 0;
  
      container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${image}" class="card-img-top object-fit-cover" style="height: 200px;" alt="${alt}"
            onerror="this.onerror=null; this.src='https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg';" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${listing.title}</h5>
              <p class="card-text">${listing.description || "No description"}</p>
              <div class="mt-auto">
                <div class="d-flex justify-content-between">
                  <div>
                    <strong>Highest bid:</strong>
                    <div>$${highestBid}</div>
                  </div>
                  <div>
                    <strong>Time left:</strong>
                    <div class="countdown" data-endsat="${endsAt}">${formatTimeLeft(endsAt)}</div>
                  </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                  <button class="btn btn-${accessToken ? "primary" : "secondary"}"
                    ${accessToken ? `data-bs-toggle="modal" data-bs-target="#bidModal" data-bid-id="${listing.id}"` : "disabled"}>
                    ${accessToken ? "Bid" : "Log in to bid"}
                  </button>

                  <a href="/pages/auctionDetail.html?id=${listing.id}" class="btn btn-outline-primary">
                    View
                  </a>
                </div> 
              </div>
            </div>
          </div>
        </div>
      `;
    });
  
    const shouldShowButton = accessToken
      ? !showAll && otherListings.length > 0
      : !showAll && otherListings.length > 9;
  
    loadMoreBtn.style.display = shouldShowButton ? "block" : "none";
  }
  

// Plasser denne under sammen med renderListings
export function getAllListings() {
    return [...userListings, ...otherListings];
  }

setInterval(() => {
  document.querySelectorAll(".countdown").forEach((el) => {
    el.textContent = formatTimeLeft(el.dataset.endsat);
  });
}, 1000);

loadMoreBtn.addEventListener("click", () => {
  showAll = true;
  renderListings();
});

fetchUserListings();

// Dette gjør at placeBid.js kan kalle den
window.refreshListings = async function () {
    await fetchUserListings(); // Dette vil hente alt på nytt og re-rendre
  };

  
