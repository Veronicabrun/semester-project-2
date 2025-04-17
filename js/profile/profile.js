// js/profile/profile.js
import { API_KEY, API_BASE_URL } from "../config/constants.js";
import { retrieveFromLocalStorage } from "../utilities/localStorage.js";
import { fetchMyBids } from "./userBids.js";
import { showLoadingIndicator, hideLoadingIndicator } from "../utilities/loader.js";


export async function fetchUserProfile() {
  const username = retrieveFromLocalStorage("username");
  const accessToken = retrieveFromLocalStorage("accessToken");

  if (!username || !accessToken) {
    console.error(" Missing username or token. User is not logged in.");
    return;
  }

  showLoadingIndicator(); // 👈 Start loader

  try {
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const { data } = await response.json();

    // Update ONLY if the elements exist on the page
    const usernameEl = document.getElementById("profileUsername");
    if (usernameEl) usernameEl.textContent = data.name || "Username";

    const emailEl = document.getElementById("profileEmail");
    if (emailEl) emailEl.textContent = data.email || "Email not found";

    const creditsEl = document.getElementById("profileCredits");
    if (creditsEl) creditsEl.textContent = data.credits || 0;

    const bioEl = document.getElementById("profileBio");
    if (bioEl) bioEl.textContent = data.bio || "No bio yet";

    const avatarEl = document.getElementById("profileAvatar");
    if (avatarEl) avatarEl.src = data.avatar?.url || "https://via.placeholder.com/300x300?text=Avatar";

    // Navbar credits appear on multiple pages
    const navbarCredits = document.getElementById("credits");
    if (navbarCredits) {
      navbarCredits.textContent = `Credits: ${data.credits}`;
    }

  } catch (error) {
    console.error(" Error retrieving user profile:", error);
  } finally {
    hideLoadingIndicator(); // 👈 Fjern loader uansett
  }
}

fetchUserProfile();

fetchMyBids(); //  Get bids after profile is loaded