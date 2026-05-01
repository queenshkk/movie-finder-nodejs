import usersServices from "../services/users.services.js";

export async function getAllUsers(req, res, next) {
    try {
        const result = await usersServices.getAllUsers();
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
}

export async function getUserById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const result = await usersServices.getUserById(id);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
}

export async function createUser(req, res, next) {
    try {
        const result = await usersServices.createUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
}

export async function updateUser(req, res, next) {
    try {
        const id = Number(req.params.id);
        const result = await usersServices.updateUser(id, req.body);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = Number(req.params.id);
        const result = await usersServices.deleteUser(id);
        res.status(result.status).json(result.data);
    } catch (error) {
        next(error);
    }
}