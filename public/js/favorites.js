import { getJsonHeaders } from "./api.js";

const favoritesList = document.getElementById("favorites-list");
const token = localStorage.getItem("token");

if (!token) {
    alert("Vous devez être connecté pour voir vos favoris.");
    window.location.href = "login.html";
}

const createFavoriteCard = (favorite) => {
    const article = document.createElement("article");
    article.className = "movie-card";

    article.innerHTML = `
        <img src="${favorite.posterUrl || "images/aladdin.jpg"}" alt="${favorite.movieTitle}">

        <div class="movie-card-content">
            <h3>${favorite.movieTitle}</h3>
            <p>${favorite.movieYear || ""}</p>

            <input class="favorite-comment" type="text" value="${favorite.comment || ""}" placeholder="Commentaire">

            <div class="card-actions">
                <button class="secondary-btn update-btn" type="button">Modifier</button>
                <button class="danger-btn delete-btn" type="button">Supprimer</button>
            </div>
        </div>
    `;

    const input = article.querySelector(".favorite-comment");
    const updateBtn = article.querySelector(".update-btn");
    const deleteBtn = article.querySelector(".delete-btn");

    updateBtn.addEventListener("click", async () => {
        await fetch(`/api/favorites/${favorite.id}`, {
            method: "PATCH",
            headers: getJsonHeaders(),
            body: JSON.stringify({
                comment: input.value
            })
        });

        alert("Commentaire modifié.");
    });

    deleteBtn.addEventListener("click", async () => {
        await fetch(`/api/favorites/${favorite.id}`, {
            method: "DELETE",
            headers: getJsonHeaders()
        });

        loadFavorites();
    });

    return article;
};

const loadFavorites = async () => {
    try {
        const response = await fetch("/api/favorites", {
            headers: getJsonHeaders()
        });

        const favorites = await response.json();

        favoritesList.innerHTML = "";

        if (!Array.isArray(favorites) || favorites.length === 0) {
            favoritesList.innerHTML = "<p>Aucun favori pour le moment.</p>";
            return;
        }

        favorites.forEach((favorite) => {
            favoritesList.appendChild(createFavoriteCard(favorite));
        });
    } catch (error) {
        console.error(error);
        favoritesList.innerHTML = "<p>Erreur lors du chargement des favoris.</p>";
    }
};

loadFavorites();