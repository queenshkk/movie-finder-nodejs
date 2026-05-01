import express from "express";

const router = express.Router();

router.get("/popular", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.movieofthenight.com/v4/shows/search/title?title=movie&country=be",
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
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

router.get("/search", async (req, res) => {
    try {
        const title = req.query.title;

        if (!title) {
            return res.status(400).json({
                message: "Aucun titre reçu"
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
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
});

export default router;