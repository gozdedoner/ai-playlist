export async function generateAIPlaylist(
  mood: string,
  genre: string,
  tempo: string,
  artist: string
) {
  try {
    const response = await fetch("http://localhost:5000/api/ai/playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, genre, tempo, artist }),
    });

    const data = await response.json();

    console.log("🎧 Backend AI Playlist Response:", data);

    if (!data.success) {
      console.error("❌ Backend AI Error:", data);
      return { songs: [] };
    }

    return { songs: data.songs };
  } catch (error) {
    console.error("AI playlist fetch error:", error);
    return { songs: [] };
  }
}
