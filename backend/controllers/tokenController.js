import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const getSpotifyToken = async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json({ access_token: response.data.access_token });
  } catch (err) {
    console.error("Spotify Token Error:", err);
    res.status(500).json({ error: "Token alınamadı" });
  }
};
