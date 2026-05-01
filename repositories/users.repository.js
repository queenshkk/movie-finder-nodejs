import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
    filename: "./data/database.sqlite",
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

const getAllUsers = async () => {
    return await db.all("SELECT id, name, email FROM users");
};

const getUserById = async (id) => {
    return await db.get(
        "SELECT id, name, email FROM users WHERE id = ?",
        [id]
    );
};

const getUserByName = async (name) => {
    return await db.get(
        "SELECT * FROM users WHERE name = ?",
        [name]
    );
};

const getUserByEmail = async (email) => {
    return await db.get(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
};

const createUser = async (userData) => {
    const result = await db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [userData.name, userData.email, userData.password]
    );

    return {
        id: result.lastID,
        name: userData.name,
        email: userData.email
    };
};

const updateUser = async (id, updatedData) => {
    const currentUser = await db.get(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    if (!currentUser) {
        return null;
    }

    const name = updatedData.name ?? currentUser.name;
    const email = updatedData.email ?? currentUser.email;
    const password = updatedData.password ?? currentUser.password;

    await db.run(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, password, id]
    );

    return await getUserById(id);
};

const deleteUser = async (id) => {
    await db.run(
        "DELETE FROM users WHERE id = ?",
        [id]
    );
};

export default {
    getAllUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};