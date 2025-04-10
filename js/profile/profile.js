// js/profile/profile.js
import { API_KEY, API_BASE_URL } from "../config/constants.js";
import { retrieveFromLocalStorage } from "../utilities/localStorage.js";
import { fetchMyBids } from "./userBids.js";

export async function fetchUserProfile() {
  const username = retrieveFromLocalStorage("username");
  const accessToken = retrieveFromLocalStorage("accessToken");

  if (!username || !accessToken) {
    console.error(" Mangler brukernavn eller token. Brukeren er ikke logget inn.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auction/profiles/${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const { data } = await response.json();

    // Oppdater KUN hvis elementene finnes på siden
    const usernameEl = document.getElementById("profileUsername");
    if (usernameEl) usernameEl.textContent = data.name || "Brukernavn";

    const emailEl = document.getElementById("profileEmail");
    if (emailEl) emailEl.textContent = data.email || "E-post ikke funnet";

    const creditsEl = document.getElementById("profileCredits");
    if (creditsEl) creditsEl.textContent = data.credits || 0;

    const bioEl = document.getElementById("profileBio");
    if (bioEl) bioEl.textContent = data.bio || "No bio yet";

    const avatarEl = document.getElementById("profileAvatar");
    if (avatarEl) avatarEl.src = data.avatar?.url || "https://via.placeholder.com/300x300?text=Avatar";

    // Navbar credits vises på flere sider
    const navbarCredits = document.getElementById("credits");
    if (navbarCredits) {
      navbarCredits.textContent = `Credits: ${data.credits}`;
    }

  } catch (error) {
    console.error(" Feil ved henting av brukerprofil:", error);
  }
}

fetchUserProfile();

fetchMyBids(); // ✅ Hent budene etter profilen er lastet