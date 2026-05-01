// services/favorites.services.js
import * as favoritesRepository from "../repositories/favorites.repository.js";

export const getFavorites = async (userId) => {
    return await favoritesRepository.getFavoritesByUser(userId);
};

export const createFavorite = async (data) => {
    if (!data.movieTitle) {
        const error = new Error("Le titre du film est obligatoire");
        error.status = 400;
        throw error;
    }
    return await favoritesRepository.createFavorite(data);
};

export const updateFavorite = async (id, userId, comment) => {
    return await favoritesRepository.updateFavorite(id, userId, comment || "");
};

export const deleteFavorite = async (id, userId) => {
    return await favoritesRepository.deleteFavorite(id, userId);
};