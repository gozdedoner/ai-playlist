export async function searchSongs(query: string) {
  try {
    const token = localStorage.getItem("spotify_token");

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data.tracks?.items || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
