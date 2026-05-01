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