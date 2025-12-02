import express from "express";
import { generatePlaylist } from "../controllers/aiController.js";

const router = express.Router();

router.post("/playlist", generatePlaylist);

export default router;
