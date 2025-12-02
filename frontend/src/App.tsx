import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FavoritesPage from "./pages/FavoritesPage";

import { getSpotifyToken } from "./services/getToken";
import { searchSongs } from "./services/searchSongs";
import { generateAIPlaylist } from "./services/generateAIPlaylist";

import SongCard from "./components/SongCard";
import ThemeToggle from "./components/ThemeToggle";
import AIPlaylistModal from "./components/AIPlaylistModal";
import MiniPlayer from "./components/MiniPlayer";
import FullPlayerModal from "./components/FullPlayerModal";
import SkeletonCard from "./components/SkeletonCard";
import WaveAnimation from "./components/WaveAnimation";
import HomeGlassPanel from "./components/HomeGlassPanel";
import AICoverModal from "./components/AICoverModal";

import { ThemeProvider } from "./context/ThemeContext";
import { PlayerProvider } from "./context/PlayerContext";

import "./index.css";

export default function App() {
  const navigate = useNavigate();

  const [tokenStatus, setTokenStatus] = useState<string>("Bekleniyor...");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const [fullPlayerOpen, setFullPlayerOpen] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  // ✔ Spotify Token Fetch
  useEffect(() => {
    async function fetchToken() {
      const token = await getSpotifyToken();
      if (token) {
        localStorage.setItem("spotify_token", token);
        setTokenStatus("Alındı 🎉");
      } else {
        setTokenStatus("Alınamadı ❌");
      }
    }
    fetchToken();
  }, []);

  // ✔ Favorileri yükle
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // ✔ Favori Ekle/Çıkar
  function toggleFavorite(track: any) {
    let updated;
    if (favorites.some((fav) => fav.id === track.id)) {
      updated = favorites.filter((fav) => fav.id !== track.id);
    } else {
      updated = [...favorites, track];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  // ✔ Normal Şarkı Arama
  const handleSearch = async () => {
    if (!query.trim()) return;

    const token = localStorage.getItem("spotify_token");
    const data = await searchSongs(query, token);

    setResults(data);
  };

  // 🎧 PRO MODE — AI Playlist Generate (DÜZELTİLMİŞ)
  async function handleGenerate({
    mood,
    genre,
    tempo,
    artist,
  }: {
    mood: string;
    genre: string;
    tempo: string;
    artist: string;
  }) {
    setLoadingAI(true);

    const prompt = `
Mood: ${mood}
Genre: ${genre}
Tempo: ${tempo} BPM
Artist vibe: ${artist}

Generate a JSON list of 10 songs:
[
  { "title": "", "artist": "" }
   console.log("AI RESULT:", result);

]
`;

    const result = await generateAIPlaylist(prompt, mood);

    if (result?.songs) {
      await convertAISongsToSpotify(result.songs);
    } else {
      console.error("❌ AI playlist empty:", result);
    }

    setShowAIModal(false);
    setLoadingAI(false);
  }

  // 🎧 AI Playlist → Spotify Eşleştirme
  async function convertAISongsToSpotify(songs: any[]) {
    console.log("AI'DAN GELEN ŞARKILAR:", songs);

    const token = localStorage.getItem("spotify_token");
    const finalList: any[] = [];

    for (const item of songs) {
      const q = `${item.title} ${item.artist}`;
      console.log("🔍 Spotify'da aranan:", q);

      const found = await searchSongs(q, token);

      if (found && found.length > 0) {
        finalList.push(found[0]);
      }
    }

    console.log("🎶 EKRANA BASILACAK SON LİSTE:", finalList);
    setResults(finalList);
  }

  return (
    <ThemeProvider>
      <PlayerProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen relative bg-pastel-gradient dark:bg-gray-900 transition-colors">
                <div className="w-full flex justify-end p-4 z-10">
                  <ThemeToggle />
                </div>

                <div className="w-full flex justify-center mb-4 z-10">
                  <button
                    onClick={() => navigate("/favorites")}
                    className="px-5 py-2 rounded-2xl font-semibold text-white shadow-xl 
                    bg-purple-500/40 hover:bg-purple-500/60 border border-purple-300/40 hover:scale-105 transition"
                  >
                    ⭐ Favoriler
                  </button>
                </div>

                {showAIModal && (
                  <AIPlaylistModal
                    onClose={() => setShowAIModal(false)}
                    onGenerate={handleGenerate}
                  />
                )}

                {showCoverModal && (
                  <AICoverModal
                    onClose={() => setShowCoverModal(false)}
                    onGenerate={(style, theme) => {
                      console.log("Cover generated:", style, theme);
                      setShowCoverModal(false);
                    }}
                  />
                )}

                <HomeGlassPanel>
                  <h1
                    className="text-3xl font-extrabold text-center mb-4 
                    bg-gradient-to-r from-pink-300 to-purple-400 
                    bg-clip-text text-transparent"
                  >
                    🎧 AI Playlist Generator
                  </h1>

                  <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
                    Spotify AI Music Experience · Token:{" "}
                    <strong>{tokenStatus}</strong>
                  </p>

                  <div className="flex justify-center gap-3 mb-6">
                    <input
                      type="text"
                      placeholder="Şarkı ara..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="px-4 py-2 rounded-xl border w-64
                      bg-white/60 dark:bg-gray-700/60 backdrop-blur
                      text-gray-900 dark:text-gray-100"
                    />

                    <button
                      onClick={handleSearch}
                      className="px-6 py-2 rounded-xl text-white font-semibold shadow 
                      bg-gradient-to-r from-pink-400 to-purple-500 
                      hover:scale-105 transition"
                    >
                      Ara 🔍
                    </button>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setShowAIModal(true)}
                      className="px-6 py-3 rounded-xl text-white font-bold shadow-lg 
                      bg-gradient-to-r from-purple-500 to-blue-500 
                      hover:scale-110 hover:shadow-2xl transition-all"
                    >
                      🚀 AI Playlist Oluştur
                    </button>
                  </div>

                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setShowCoverModal(true)}
                      className="px-6 py-2 rounded-xl font-semibold text-white shadow-lg 
                      bg-gradient-to-r from-blue-500 to-purple-600 
                      hover:scale-105 transition"
                    >
                      🖼️ Playlist Cover Oluştur
                    </button>
                  </div>
                </HomeGlassPanel>

                {loadingAI && (
                  <div className="text-center mt-8 z-10">
                    <p className="text-purple-500 font-semibold">
                      🤖 AI playlist oluşturuluyor...
                    </p>
                    <WaveAnimation />
                  </div>
                )}

                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-20 mt-10 z-10">
                  {loadingAI && results.length === 0 && (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}

                  {results.map((track) => (
                    <SongCard
                      key={track.id}
                      track={track}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                <MiniPlayer onOpenModal={() => setFullPlayerOpen(true)} />
                <FullPlayerModal
                  isOpen={fullPlayerOpen}
                  onClose={() => setFullPlayerOpen(false)}
                />
              </div>
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </PlayerProvider>
    </ThemeProvider>
  );
}
