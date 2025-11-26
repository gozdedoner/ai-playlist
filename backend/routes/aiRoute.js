import express from "express";
import { generatePlaylist } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generatePlaylist);

export default router;
