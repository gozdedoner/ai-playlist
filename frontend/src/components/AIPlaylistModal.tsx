import { useState } from "react";

export default function AIPlaylistModal({ onClose, onGenerate }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [tempo, setTempo] = useState(100);
  const [artistVibe, setArtistVibe] = useState("");

  const moods = ["Chill", "Happy", "Dark", "Dreamy", "Energetic", "Sad"];
  const genres = ["Lofi", "Synthwave", "Pop", "Indie", "Electronic", "R&B"];

  function handleSubmit() {
    // ✅ Mood seçilmediyse istek gönderme
    if (!selectedMood) {
      alert("Lütfen bir mood seçiniz 🎧");
      return;
    }

    // ✅ Genre seçilmediyse istek gönderme
    if (!selectedGenre) {
      alert("Lütfen bir genre seçiniz 🎶");
      return;
    }

    // Backend'e doğru veri formatı gönderiliyor
    onGenerate({
      mood: selectedMood,
      genre: selectedGenre,
      tempo,
      artist: artistVibe,
    });
  }

  return (
    <div
      className="
        fixed inset-0 z-50 flex justify-center items-center
        bg-gradient-to-br from-purple-600 via-pink-500 to-blue-400
        bg-opacity-90 backdrop-blur-2xl animate-fadeIn
      "
    >
      <div
        className="
          w-[90%] max-w-xl p-6 rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20 shadow-2xl
          text-white animate-scaleIn
        "
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          🌅 AI Playlist — PRO Mode
        </h2>

        {/* MOOD */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Mood</label>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`
                  px-4 py-2 rounded-full text-sm border
                  transition
                  ${
                    selectedMood === mood
                      ? "bg-pink-400 text-white border-pink-300"
                      : "bg-white/20 hover:bg-white/30 border-white/30"
                  }
                `}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* GENRE */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Genre</label>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`
                  px-4 py-2 rounded-full text-sm border
                  transition
                  ${
                    selectedGenre === g
                      ? "bg-blue-400 text-white border-blue-300"
                      : "bg-white/20 hover:bg-white/30 border-white/30"
                  }
                `}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* TEMPO */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">
            Tempo (BPM)
          </label>
          <input
            type="range"
            min="60"
            max="180"
            value={tempo}
            onChange={(e) => setTempo(e.target.value)}
            className="w-full accent-pink-300"
          />
          <p className="text-center text-sm mt-1 opacity-90">{tempo} BPM</p>
        </div>

        {/* ARTIST VIBE */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">
            Artist Vibe
          </label>
          <input
            type="text"
            value={artistVibe}
            onChange={(e) => setArtistVibe(e.target.value)}
            placeholder="Örn: The Weeknd, Billie Eilish..."
            className="
              w-full p-3 rounded-xl
              bg-white/20 border border-white/30
              placeholder-white/60
            "
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl bg-white/20 border border-white/40
              hover:bg-white/30 transition
            "
          >
            Kapat
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-6 py-2 rounded-xl font-semibold
              bg-gradient-to-r from-purple-400 to-blue-500
              shadow-lg hover:scale-105 transition
            "
          >
            🎧 Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}
