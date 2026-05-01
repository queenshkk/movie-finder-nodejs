const form = document.getElementById("login-form");
const feedback = document.getElementById("login-feedback");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const credentials = {
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erreur de connexion.");
        }

        localStorage.setItem("token", data.token);
        
        feedback.textContent = "Connexion réussie. Redirection...";
        feedback.className = "feedback success";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } catch (error) {
        feedback.textContent = error.message;
        feedback.className = "feedback error";
    }
});