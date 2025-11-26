import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePlaylist = async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
Kullanıcı: "${prompt}"

Sadece tam geçerli JSON ver.
5 adet şarkı öner. Format:

[
  { "name": "Şarkı adı", "artist": "Sanatçı" }
]

Kod bloğu, açıklama, yorum, markdown kullanma.
          `,
        },
      ],
    });

    let text = completion.choices[0].message.content.trim();
    console.log("AI cevabı (ham):", text);

    // ---- JSON Temizleyici ----
    // Kod bloklarını temizle
    text = text.replace(/```json/gi, "").replace(/```/g, "");

    // JSON dışı açıklama kaldır
    const firstBracket = text.indexOf("[");
    const lastBracket = text.lastIndexOf("]");

    if (firstBracket === -1 || lastBracket === -1) {
      throw new Error("Geçersiz JSON formatı");
    }

    text = text.slice(firstBracket, lastBracket + 1);

    const tracks = JSON.parse(text);

    return res.json({ tracks });
  } catch (error) {
    console.error("AI Playlist Hatası:", error);
    return res.status(500).json({ error: "AI playlist oluşturulamadı" });
  }
};
