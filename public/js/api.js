export const getToken = () => {
    return localStorage.getItem("token");
};

export const getJsonHeaders = () => {
    const headers = {
        "Content-Type": "application/json"
    };

    const token = getToken();

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

export const getMoviesArray = (data) => {
    if (Array.isArray(data)) {
        return data;
    }

    if (data.shows && Array.isArray(data.shows)) {
        return data.shows;
    }

    if (data.result && Array.isArray(data.result)) {
        return data.result;
    }

    return [];
};

export const getFirstMovie = (data) => {
    const movies = getMoviesArray(data);
    return movies.length > 0 ? movies[0] : null;
};

export const getPoster = (movie) => {
    return (
        movie?.imageSet?.verticalPoster?.w480 ||
        movie?.imageSet?.verticalPoster?.w342 ||
        movie?.imageSet?.verticalPoster?.w240 ||
        "images/aladdin.jpg"
    );
};

export const getGenresText = (movie) => {
    if (!movie.genres || movie.genres.length === 0) {
        return "Genre inconnu";
    }

    return movie.genres
        .map((genre) => {
            if (typeof genre === "string") {
                return genre;
            }

            return genre.name || genre.id || "";
        })
        .filter(Boolean)
        .join(", ");
};

export const createMovieCard = (movie) => {
    const article = document.createElement("article");
    article.className = "movie-card";

    article.innerHTML = `
        <a href="film.html?title=${encodeURIComponent(movie.title)}">
            <img src="${getPoster(movie)}" alt="${movie.title}">
        </a>

        <div class="movie-card-content">
            <h3>${movie.title || "Titre inconnu"}</h3>
            <p>${movie.releaseYear || "Année inconnue"} • ${getGenresText(movie)}</p>
        </div>
    `;

    return article;
};