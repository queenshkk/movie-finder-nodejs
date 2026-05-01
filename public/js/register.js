const form = document.getElementById("register-form");
const feedback = document.getElementById("register-feedback");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const user = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erreur lors de l'inscription.");
        }

        feedback.textContent = "Inscription réussie. Redirection...";
        feedback.className = "feedback success";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    } catch (error) {
        feedback.textContent = error.message;
        feedback.className = "feedback error";
    }
});