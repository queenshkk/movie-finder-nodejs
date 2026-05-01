import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getFavorites,
  createFavorite,
  updateFavorite,
  deleteFavorite
} from "../controllers/favorites.controller.js";

const router = Router();

router.get("/", authMiddleware, getFavorites);
router.post("/", authMiddleware, createFavorite);
router.patch("/:id", authMiddleware, updateFavorite);
router.delete("/:id", authMiddleware, deleteFavorite);

export default router;