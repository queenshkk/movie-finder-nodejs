import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/movies", moviesRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});