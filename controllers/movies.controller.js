export const getPopular = async (req, res, next) => {
    try {
        const response = await fetch(
            "https://api.movieofthenight.com/v4/shows/search/title?title=movie&country=be",
            {
                method: "GET",
                headers: { "X-API-Key": process.env.MOTN_API_KEY }
            }
        );
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        next(error);
    }
};

export const searchMovies = async (req, res, next) => {
    try {
        const title = req.query.title;

        if (!title) {
            return res.status(400).json({ message: "Aucun titre reçu" });
        }

        const response = await fetch(
            `https://api.movieofthenight.com/v4/shows/search/title?title=${encodeURIComponent(title)}&country=be`,
            {
                method: "GET",
                headers: { "X-API-Key": process.env.MOTN_API_KEY }
            }
        );
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        next(error);
    }
};

export const searchByPlatform = async (req, res, next) => {
    try {
        const platform = req.params.platform;

        const catalogIds = {
            netflix: "netflix",
            prime: "prime.video",
            disney: "disney.plus",
            apple: "apple.tv",
        };

        const catalogId = catalogIds[platform];

        if (!catalogId) {
            return res.status(400).json({ message: "Plateforme inconnue" });
        }

        const response = await fetch(
            `https://api.movieofthenight.com/v4/shows/search/title?title=the&country=be&catalogs=${catalogId}&type=movie`,
            {
                method: "GET",
                headers: { "X-API-Key": process.env.MOTN_API_KEY }
            }
        );

        const data = await response.json();
        let movies = [];

        if (Array.isArray(data)) {
            movies = data;
        } else if (data.shows && Array.isArray(data.shows)) {
            movies = data.shows;
        } else if (data.result && Array.isArray(data.result)) {
            movies = data.result;
        }

        res.json(movies);
    } catch (error) {
        next(error);
    }
};

export const searchMotn = async (req, res, next) => {
    try {
        const title = req.body.title;

        if (!title) {
            return res.status(400).json({ error: "Aucun titre reçu" });
        }

        const response = await fetch(
            `https://api.movieofthenight.com/v4/shows/search/title?title=${encodeURIComponent(title)}&country=be`,
            {
                method: "GET",
                headers: { "X-API-Key": process.env.MOTN_API_KEY }
            }
        );
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        next(error);
    }
};