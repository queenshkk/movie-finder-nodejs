import * as favoritesServices from "../services/favorites.services.js";

export const getFavorites = async (req, res, next) => {
    try {
        const favorites = await favoritesServices.getFavorites(req.user.id);
        res.json(favorites);
    } catch (error) {
        next(error);
    }
};

export const createFavorite = async (req, res, next) => {
    try {
        const { movieTitle, movieYear, posterUrl, comment } = req.body;

        const favorite = await favoritesServices.createFavorite({
            userId: req.user.id,
            movieTitle,
            movieYear,
            posterUrl,
            comment
        });

        res.status(201).json(favorite);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const favorite = await favoritesServices.updateFavorite(
            req.params.id,
            req.user.id,
            req.body.comment
        );
        res.json(favorite);
    } catch (error) {
        next(error);
    }
};

export const deleteFavorite = async (req, res, next) => {
    try {
        await favoritesServices.deleteFavorite(req.params.id, req.user.id);
        res.json({ message: "Favori supprimé" });
    } catch (error) {
        next(error);
    }
};