export async function searchSongs(query: string, token?: string) {
  try {
    const accessToken = token || localStorage.getItem("spotify_token");

    if (!accessToken) {
      console.error("❌ Spotify token yok!");
      return [];
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=10`;

    console.log("🔍 Spotify API URL:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("❌ Spotify API Error:", response.status);
      return [];
    }

    const data = await response.json();
    console.log("🎧 Spotify API CEVABI:", data);

    return data.tracks?.items || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
