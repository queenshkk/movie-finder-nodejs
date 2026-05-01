const authBtn = document.getElementById("auth-btn");
const authMenu = document.getElementById("auth-menu");

if (authBtn && authMenu) {
    authBtn.addEventListener("click", () => {
        authMenu.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".auth-dropdown")) {
            authMenu.classList.remove("show");
        }
    });
}

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "index.html";
    });
}

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const searchMovie = () => {
    const title = searchInput.value.trim();

    if (title === "") {
        alert("Veuillez entrer le nom d'un film.");
        return;
    }

    window.location.href = `film.html?title=${encodeURIComponent(title)}`;
};

if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", searchMovie);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchMovie();
        }
    });
}

const popularMovies = [
    "Harry Potter",
    "Aladdin",
    "Astérix et Obélix",
    "Batman"
];

const movieGrid = document.querySelector("#popular-movies");

async function fetchMovie(title) {
    const response = await fetch(`/api/movies/search?title=${encodeURIComponent(title)}`);

    if (!response.ok) {
        throw new Error(`Erreur API pour ${title}`);
    }

    return await response.json();
}

function getPosterUrl(movie) {
    if (movie.poster) {
        return movie.poster;
    }

    if (movie.Poster) {
        return movie.Poster;
    }

    if (movie.poster_path) {
        return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    }

    return "../images/aladdin.jpg";
}

function getMovieTitle(movie, fallbackTitle) {
    return movie.title || movie.Title || movie.name || fallbackTitle;
}

function getMovieGenre(movie) {
    if (movie.genre) {
        return movie.genre;
    }

    if (movie.Genre) {
        return movie.Genre;
    }

    if (Array.isArray(movie.genres)) {
        return movie.genres.map((genre) => genre.name || genre).join(", ");
    }

    return "Genre non disponible";
}

function createMovieCard(movie, fallbackTitle) {
    const title = getMovieTitle(movie, fallbackTitle);
    const poster = getPosterUrl(movie);
    const genre = getMovieGenre(movie);

    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
        <a href="film.html?title=${encodeURIComponent(title)}">
            <img class="movie-image" src="${poster}" alt="${title}">
        </a>

        <div class="movie-card-content">
            <h3>${title}</h3>
            <p>${genre}</p>
        </div>
    `;

    return card;
}

function createFallbackCard(title) {
    const card = document.createElement("article");
    card.className = "movie-card";

    card.innerHTML = `
        <a href="film.html?title=${encodeURIComponent(title)}">
            <img class="movie-image" src="../images/default-poster.jpg" alt="${title}">
        </a>

        <div class="movie-card-content">
            <h3>${title}</h3>
            <p>Informations non disponibles</p>
        </div>
    `;

    return card;
}

async function loadPopularMovies() {
    if (!movieGrid) return;

    try {
        const response = await fetch("/api/movies/popular");

        if (!response.ok) {
            throw new Error("Impossible de récupérer les films populaires");
        }

        const data = await response.json();

        let movies = [];

        if (Array.isArray(data)) {
        movies = data;
        } else {
        movies = data.shows || data.results || [];
        }
        
        movieGrid.innerHTML = "";

        movies.slice(0, 8).forEach((movie) => {
            const title = movie.title || movie.name || "Titre inconnu";

            const posterUrl =
                movie.poster ||
                movie.image ||
                movie.imageSet?.verticalPoster?.w720 ||
                movie.imageSet?.verticalPoster?.w480 ||
                movie.imageSet?.verticalBackdrop?.w720 ||
                "../images/default-poster.jpg";

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

            movieGrid.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        movieGrid.innerHTML = "<p>Impossible de charger les films populaires.</p>";
    }
}

loadPopularMovies();