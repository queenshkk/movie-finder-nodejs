import { createMovieCard, getMoviesArray } from "./api.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultsContainer = document.getElementById("results");
const feedback = document.getElementById("search-feedback");

const displayMovies = (movies) => {
    resultsContainer.innerHTML = "";

    if (movies.length === 0) {
        feedback.textContent = "Aucun film trouvé.";
        return;
    }

    feedback.textContent = `${movies.length} résultat(s) trouvé(s).`;

    movies.forEach((movie) => {
        resultsContainer.appendChild(createMovieCard(movie));
    });
};

const searchMovies = async () => {
    const title = searchInput.value.trim();

    if (title === "") {
        alert("Veuillez entrer un titre.");
        return;
    }

    feedback.textContent = "Recherche en cours...";
    resultsContainer.innerHTML = "";

    try {
        const response = await fetch("/api/motn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        const data = await response.json();
        const movies = getMoviesArray(data);

        displayMovies(movies);
    } catch (error) {
        console.error(error);
        feedback.textContent = "Erreur lors de la recherche.";
    }
};

if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", searchMovies);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchMovies();
        }
    });
}