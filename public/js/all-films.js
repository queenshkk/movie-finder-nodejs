const searchInput = document.getElementById("all-films-search-input");
const searchBtn = document.getElementById("all-films-search-btn");
const resultsContainer = document.getElementById("movies-results");

async function searchFilms() {
    const title = searchInput.value.trim();

    if (title === "") {
        alert("Veuillez entrer le nom d'un film.");
        return;
    }

    try {
        const response = await fetch(`/api/movies/search?title=${encodeURIComponent(title)}`);

        if (!response.ok) {
            throw new Error("Erreur lors de la recherche");
        }

        const data = await response.json();

        let movies = [];

        if (Array.isArray(data)) {
        movies = data;
        } else if (data.shows) {
        movies = data.shows;
        } else if (data.results) {
        movies = data.results;
        }

        resultsContainer.innerHTML = "";

        if (movies.length === 0) {
            resultsContainer.innerHTML = "<p>Aucun film trouvé.</p>";
            return;
        }

        movies.forEach((movie) => {
            const title = movie.title || movie.name || "Titre inconnu";

            const posterUrl =
                movie.poster ||
                movie.image ||
                movie.imageSet?.verticalPoster?.w720 ||
                movie.imageSet?.verticalPoster?.w480 ||
                movie.imageSet?.verticalBackdrop?.w720 ||
                "../images/aladdin.jpg";

            const card = document.createElement("article");
            card.className = "movie-card";

            card.innerHTML = `
                <a href="film.html?title=${encodeURIComponent(title)}">
                    <img class="movie-image" src="${posterUrl}" alt="${title}">
                </a>

                <div class="movie-card-content">
                    <h3>${title}</h3>
                    <p>${movie.type || "Film"}</p>
                </div>
            `;

            resultsContainer.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = "<p>Impossible de charger les résultats.</p>";
    }
}

if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", searchFilms);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchFilms();
        }
    });
}