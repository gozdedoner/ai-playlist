export async function generateAIPlaylist(prompt: string, mood: string) {
  try {
    const response = await fetch("http://localhost:5000/api/ai/playlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, mood }),
    });

    const data = await response.json();

    if (!data.raw) {
      console.error("❌ Backend 'raw' göndermedi:", data);
      return { songs: [] };
    }

    // Kod bloğu işaretlerini temizle
    let clean = data.raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let songs = [];

    try {
      songs = JSON.parse(clean);
    } catch (e) {
      console.error("❌ JSON parse error:", e, clean);
    }

    return { songs };
  } catch (error) {
    console.error("AI playlist fetch error:", error);
    return { songs: [] };
  }
}
