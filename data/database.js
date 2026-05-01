import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./data/database.sqlite");

export const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (error) {
            if (error) {
                reject(error);
            } else {
                resolve(this);
            }
        });
    });
};

export const get = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (error, row) => {
            if (error) {
                reject(error);
            } else {
                resolve(row);
            }
        });
    });
};

export const all = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
        });
    });
};

export const initializeDatabase = async () => {
    await run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);

    await run(`
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
};