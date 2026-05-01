import { getFirstMovie, getGenresText, getPoster, getJsonHeaders } from "./api.js";

const titleElement = document.getElementById("movie-title");
const imageElement = document.getElementById("movie-image");
const yearElement = document.getElementById("movie-year");
const genresElement = document.getElementById("movie-genres");
const durationElement = document.getElementById("movie-duration");
const ratingElement = document.getElementById("movie-rating");
const overviewElement = document.getElementById("movie-overview");
const platformsElement = document.getElementById("movie-platforms");
const favoriteBtn = document.getElementById("favorite-btn");

let currentMovie = null;

const params = new URLSearchParams(window.location.search);
const title = params.get("title");

const displayPlatforms = (movie) => {
    platformsElement.innerHTML = "";

    const options = movie.streamingOptions?.ca || [];

    if (options.length === 0) {
        platformsElement.textContent = "Aucune plateforme trouvée.";
        return;
    }

    const uniquePlatforms = [];

    options.forEach((option) => {
        const serviceName = option.service?.name || "Plateforme inconnue";

        if (!uniquePlatforms.includes(serviceName)) {
            uniquePlatforms.push(serviceName);
        }
    });

    uniquePlatforms.forEach((serviceName) => {
        const p = document.createElement("p");
        p.textContent = serviceName;
        platformsElement.appendChild(p);
    });
};

const displayMovie = (movie) => {
    currentMovie = movie;

    titleElement.textContent = `${movie.title || "Titre inconnu"} (${movie.releaseYear || "année inconnue"})`;
    imageElement.src = getPoster(movie);
    yearElement.textContent = movie.releaseYear || "Année inconnue";
    durationElement.textContent = movie.runtime ? `${movie.runtime} minutes` : "Durée inconnue";
    ratingElement.textContent = movie.rating ? `${movie.rating}/100` : "Note inconnue";
    genresElement.textContent = getGenresText(movie);
    overviewElement.textContent = movie.overview || "Résumé indisponible.";

    displayPlatforms(movie);
};

const loadMovie = async () => {
    if (!title) {
        titleElement.textContent = "Aucun film sélectionné.";
        return;
    }

    try {
        const response = await fetch("/api/movies/motn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        const data = await response.json();
        const movie = getFirstMovie(data);

        if (!movie) {
            titleElement.textContent = "Film introuvable.";
            return;
        }

        displayMovie(movie);
    } catch (error) {
        console.error(error);
        titleElement.textContent = "Erreur lors du chargement du film.";
    }
};

favoriteBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Vous devez être connecté pour ajouter un favori.");
        window.location.href = "login.html";
        return;
    }

    if (!currentMovie) {
        return;
    }

    try {
        const response = await fetch("/api/favorites", {
            method: "POST",
            headers: getJsonHeaders(),
            body: JSON.stringify({
                movieTitle: currentMovie.title,
                movieYear: currentMovie.releaseYear,
                posterUrl: getPoster(currentMovie),
                comment: ""
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erreur lors de l'ajout aux favoris.");
        }

        alert("Film ajouté aux favoris !");
    } catch (error) {
        alert(error.message);
    }
});

loadMovie();