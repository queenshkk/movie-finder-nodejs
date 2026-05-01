import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
    filename: "./data/database.sqlite",
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        movieTitle TEXT NOT NULL,
        movieYear TEXT,
        posterUrl TEXT,
        comment TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`);

export const getFavoritesByUser = async (userId) => {
    return await db.all(
        "SELECT * FROM favorites WHERE userId = ?",
        [userId]
    );
};

export const createFavorite = async (favorite) => {
    const existing = await db.get(
        "SELECT * FROM favorites WHERE userId = ? AND movieTitle = ?",
        [favorite.userId, favorite.movieTitle]
    );

    if (existing) {
        return existing;
    }

    const result = await db.run(
        `
        INSERT INTO favorites (userId, movieTitle, movieYear, posterUrl, comment)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            favorite.userId,
            favorite.movieTitle,
            favorite.movieYear || "",
            favorite.posterUrl || "",
            favorite.comment || ""
        ]
    );

    return await db.get(
        "SELECT * FROM favorites WHERE id = ?",
        [result.lastID]
    );
};

export const updateFavorite = async (id, userId, comment) => {
    await db.run(
        "UPDATE favorites SET comment = ? WHERE id = ? AND userId = ?",
        [comment, id, userId]
    );

    return await db.get(
        "SELECT * FROM favorites WHERE id = ? AND userId = ?",
        [id, userId]
    );
};

export const deleteFavorite = async (id, userId) => {
    return await db.run(
        "DELETE FROM favorites WHERE id = ? AND userId = ?",
        [id, userId]
    );
};