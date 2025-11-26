import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getSpotifyToken = async () => {
  const tokenURL = "https://accounts.spotify.com/api/token";

  const response = await axios.post(
    tokenURL,
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
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

  return response.data;
};
