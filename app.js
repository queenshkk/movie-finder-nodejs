import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);

// Route pour chercher un film avec l'API Movie of the Night
app.post("/api/motn", async (req, res, next) => {
  try {
    const title = req.body.title;

    if (!title) {
      return res.status(400).json({
        error: "Aucun titre reçu"
      });
    }

    const response = await fetch(
      `https://api.movieofthenight.com/v4/shows/search/title?title=${encodeURIComponent(title)}&country=be`,
      {
        method: "GET",
        headers: {
          "X-API-Key": process.env.MOTN_API_KEY
        }
      }
    );

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    next(error);
  }
});

app.get("/api/movies/platform/:platform", async (req, res, next) => {
  try {
    const platform = req.params.platform;

    const platformTitles = {
      netflix: ["Red Notice", "The Adam Project", "Bird Box", "Enola Holmes"],
      prime: ["The Tomorrow War", "Air", "Road House", "The Big Sick"],
      disney: ["Aladdin", "Frozen", "Moana", "Avengers"],
      apple: ["CODA", "Greyhound", "Tetris", "Finch"],
      crave: ["Batman", "Harry Potter", "Dune", "The Last of Us"]
    };

    const titles = platformTitles[platform] || [];

    const results = [];

    for (const title of titles) {
      const response = await fetch(
        `https://api.movieofthenight.com/v4/shows/search/title?title=${encodeURIComponent(title)}&country=ca`,
        {
          method: "GET",
          headers: {
            "X-API-Key": process.env.MOTN_API_KEY
          }
        }
      );

      const data = await response.json();

      if (Array.isArray(data) && data[0]) {
        results.push(data[0]);
      } else if (data.shows && data.shows[0]) {
        results.push(data.shows[0]);
      }
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});