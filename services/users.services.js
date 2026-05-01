import bcrypt from "bcrypt";
import usersRepository from "../repositories/users.repository.js";

const createAppError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export async function getAllUsers() {
    return {
        status: 200,
        data: await usersRepository.getAllUsers()
    };
}

export async function getUserById(id) {
    const user = await usersRepository.getUserById(id);

    if (!user) {
        throw createAppError("Utilisateur non trouvé", 404);
    }

    return {
        status: 200,
        data: user
    };
}

export async function createUser(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        throw createAppError("Tous les champs sont obligatoires", 400);
    }

    const existingEmail = await usersRepository.getUserByEmail(email);

    if (existingEmail) {
        throw createAppError("Cet email est déjà utilisé", 409);
    }

    const existingName = await usersRepository.getUserByName(name);

    if (existingName) {
        throw createAppError("Ce nom est déjà utilisé", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersRepository.createUser({
        name,
        email,
        password: hashedPassword
    });

    return {
        status: 201,
        data: newUser
    };
}

export async function updateUser(id, data) {
    const user = await usersRepository.getUserById(id);

    if (!user) {
        throw createAppError("Utilisateur non trouvé", 404);
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await usersRepository.updateUser(id, data);

    return {
        status: 200,
        data: updatedUser
    };
}

export async function deleteUser(id) {
    const user = await usersRepository.getUserById(id);

    if (!user) {
        throw createAppError("Utilisateur non trouvé", 404);
    }

    await usersRepository.deleteUser(id);

    return {
        status: 200,
        data: {
            message: "Utilisateur supprimé"
        }
    };
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};