import { createMovieCard, getMoviesArray } from "./api.js";

const platformButtons = document.querySelectorAll(".platform-btn");
const platformTitle = document.getElementById("platform-title");
const platformFeedback = document.getElementById("platform-feedback");
const platformResults = document.getElementById("platform-results");

const loadMoviesByPlatform = async (platform) => {
    platformTitle.textContent = `Films sur ${platform}`;
    platformFeedback.textContent = "Chargement...";
    platformResults.innerHTML = "";

    try {
        const response = await fetch(`/api/movies/platform/${platform}`);
        const data = await response.json();

        const movies = getMoviesArray(data);

        if (movies.length === 0) {
            platformFeedback.textContent = "Aucun film trouvé pour cette plateforme.";
            return;
        }

        platformFeedback.textContent = `${movies.length} film(s) trouvé(s).`;

        movies.slice(0, 8).forEach((movie) => {
            platformResults.appendChild(createMovieCard(movie));
        });
    } catch (error) {
        console.error(error);
        platformFeedback.textContent = "Erreur lors du chargement des films.";
    }
};

platformButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const platform = button.dataset.platform;
        loadMoviesByPlatform(platform);
    });
});