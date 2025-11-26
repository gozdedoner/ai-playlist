import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import tokenRoute from "./routes/tokenRoute.js";
import aiRoute from "./routes/aiRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/token", tokenRoute);
app.use("/api/ai", aiRoute);

// ❗ Vercel serverless — app.listen YOK!
export default app;
