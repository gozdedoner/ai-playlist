import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export const getSpotifyToken = async (req, res) => {
  try {
    const auth = Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + auth,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.log("Token Error:", err);
    return res.status(500).json({ error: "Token alınamadı" });
  }
};
