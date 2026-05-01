import * as favoritesRepository from "../repositories/favorites.repository.js";

export const getFavorites = async (req, res, next) => {
    try {
        const favorites = await favoritesRepository.getFavoritesByUser(req.user.id);
        res.json(favorites);
    } catch (error) {
        next(error);
    }
};

export const createFavorite = async (req, res, next) => {
    try {
        const { movieTitle, movieYear, posterUrl, comment } = req.body;

        if (!movieTitle) {
            return res.status(400).json({
                error: "Le titre du film est obligatoire"
            });
        }

        const favorite = await favoritesRepository.createFavorite({
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
        const favorite = await favoritesRepository.updateFavorite(
            req.params.id,
            req.user.id,
            req.body.comment || ""
        );

        res.json(favorite);
    } catch (error) {
        next(error);
    }
};

export const deleteFavorite = async (req, res, next) => {
    try {
        await favoritesRepository.deleteFavorite(req.params.id, req.user.id);

        res.json({
            message: "Favori supprimé"
        });
    } catch (error) {
        next(error);
    }
};