import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersRepository from "../repositories/users.repository.js";

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email et mot de passe obligatoires"
            });
        }

        const user = await usersRepository.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                error: "Identifiants invalides"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Identifiants invalides"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    return res.status(200).json({
        message: "Déconnexion réussie"
    });
};

export default {
    login,
    logout
};