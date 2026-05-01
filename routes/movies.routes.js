import { Router } from "express";
import {
    getPopular,
    searchMovies,
    searchByPlatform,
    searchMotn
} from "../controllers/movies.controller.js";

const router = Router();

router.get("/popular", getPopular);
router.get("/search", searchMovies);
router.get("/platform/:platform", searchByPlatform);
router.post("/motn", searchMotn);

export default router;