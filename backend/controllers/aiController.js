// backend/controllers/aiController.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePlaylist = async (req, res) => {
  console.log("📌 Gelen BODY:", req.body);

  const { mood, genre, tempo, artist } = req.body;

  if (!mood) {
    return res.status(400).json({ error: "Mood is required" });
  }

  try {
    const fullPrompt = `
You are an advanced AI music expert.
Create a playlist of 10 Spotify songs based on:

Mood: ${mood}
Genre: ${genre}
Tempo: ${tempo}
Artist Vibe: ${artist}

Rules:
- All songs MUST exist on Spotify
- Mix popular + underground tracks
- Follow the vibe closely
- Return ONLY PURE JSON array:
[
  { "title": "Song Name", "artist": "Artist Name" }
]
`;

    // 🔥 DÜZELTİLMİŞ OPENAI İSTEĞİ
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content;
    console.log("RAW AI RESPONSE:", raw);

    let songs = [];

    try {
      songs = JSON.parse(raw);
    } catch (err) {
      return res.json({
        error: "JSON parse error",
        raw,
      });
    }

    return res.json({ songs });
  } catch (error) {
    console.error("AI Playlist Error:", error);
    res.status(500).json({ error: "AI playlist error" });
  }
};
console.log("🔥 FINAL BACKEND JSON RETURN:", jsonResponse);
