import express from "express";
import { getSpotifyToken } from "../controllers/tokenController.js";

const router = express.Router();

router.get("/", getSpotifyToken);

export default router;
