import { Routes, Route, useNavigate } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage";

import { getSpotifyToken } from "./services/getToken";
import { searchSongs } from "./services/searchSongs";

import SongCard from "./components/SongCard";
import ThemeToggle from "./components/ThemeToggle";
import AIPlaylistModal from "./components/AIPlaylistModal";

import MiniPlayer from "./components/MiniPlayer";
import FullPlayerModal from "./components/FullPlayerModal";

import { ThemeProvider } from "./context/ThemeContext";
import { PlayerProvider } from "./context/PlayerContext";

import SkeletonCard from "./components/SkeletonCard";
import WaveAnimation from "./components/WaveAnimation";

import "./index.css";
import { useEffect, useState } from "react";

export default function App() {
  const navigate = useNavigate(); // ⭐ EKLENDİ

  const [tokenStatus, setTokenStatus] = useState<string>("Bekleniyor...");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  // ⭐ Player modal için gerekli state
  const [fullPlayerOpen, setFullPlayerOpen] = useState(false);

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

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

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

  const handleSearch = async () => {
    if (!query.trim()) return;
    const data = await searchSongs(query);
    setResults(data);
  };

  async function handleAIGenerate(prompt: string) {
    setLoadingAI(true);

    const response = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (data.tracks) {
      const songNames = data.tracks.map((t: any) => `${t.name} ${t.artist}`);
      await searchAIPlaylistSongs(songNames);
    }

    setLoadingAI(false);
  }

  async function searchAIPlaylistSongs(aiTracks: string[]) {
    let finalResults: any[] = [];

    for (const text of aiTracks) {
      const results = await searchSongs(text);
      if (results.length > 0) finalResults.push(results[0]);
    }

    setResults(finalResults);
  }

  return (
    <ThemeProvider>
      <PlayerProvider>
        <Routes>
          {/* ANA SAYFA */}
          <Route
            path="/"
            element={
              <div className="min-h-screen relative bg-pastel-gradient dark:bg-gray-900 transition-colors">
                {/* Neon grid */}
                <div className="neon-grid"></div>

                {/* Glow blobs */}
                <div className="glow-blob blob-pink"></div>
                <div className="glow-blob blob-blue"></div>
                <div className="glow-blob blob-purple"></div>

                {/* Floating particles */}
                <div className="particles">
                  <span
                    className="particle"
                    style={{ left: "10%", bottom: "0%" }}
                  ></span>
                  <span
                    className="particle"
                    style={{ left: "40%", bottom: "-20%" }}
                  ></span>
                  <span
                    className="particle"
                    style={{ left: "70%", bottom: "-10%" }}
                  ></span>
                  <span
                    className="particle"
                    style={{ left: "20%", bottom: "-30%" }}
                  ></span>
                  <span
                    className="particle"
                    style={{ left: "80%", bottom: "-15%" }}
                  ></span>
                </div>

                {/* Tema */}
                <div className="w-full flex justify-end p-4 relative z-10">
                  <ThemeToggle />
                </div>

                {/* ⭐ FAVORİLER BUTONU (CAM EFEKT + NEON MOR) */}
                <div className="w-full flex justify-center mb-6 relative z-10">
                  <button
                    onClick={() => navigate("/favorites")}
                    className="
      px-5 py-2 rounded-2xl font-semibold
      text-white shadow-xl backdrop-blur-xl
      bg-purple-500/40 dark:bg-purple-500/30
      border border-purple-300/40 dark:border-purple-400/30
      hover:bg-purple-500/60 hover:scale-105
      transition-all duration-300
    "
                  >
                    ⭐ Favoriler
                  </button>
                </div>

                {/* AI Modal */}
                {showAIModal && (
                  <AIPlaylistModal
                    onClose={() => setShowAIModal(false)}
                    onGenerate={(prompt: string) => {
                      handleAIGenerate(prompt);
                      setShowAIModal(false);
                    }}
                  />
                )}

                {/* Başlık */}
                <div className="flex flex-col items-center text-center px-6 relative z-10">
                  <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                    🎵 AI Playlist — Spotify Arama
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Token Durumu: <strong>{tokenStatus}</strong>
                  </p>
                </div>

                {/* Arama alanı */}
                <div className="flex justify-center gap-3 mb-8 relative z-10">
                  <input
                    type="text"
                    placeholder="Şarkı ara..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-gray-300 
                               dark:bg-gray-800 dark:text-gray-100 w-64"
                  />

                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 rounded-xl text-white font-semibold shadow 
                               bg-gradient-to-r from-pink-300 to-purple-400 hover:scale-105 transition"
                  >
                    Ara 🔍
                  </button>
                </div>

                {/* AI playlist */}
                <div className="flex justify-center mt-4 relative z-10">
                  <button
                    onClick={() => setShowAIModal(true)}
                    className="px-6 py-2 rounded-xl text-white font-semibold shadow 
                               bg-gradient-to-r from-purple-400 to-blue-500 hover:scale-105 transition"
                  >
                    🎧 AI Playlist Oluştur
                  </button>
                </div>

                {loadingAI && (
                  <div className="text-center mb-4 relative z-10">
                    <p className="text-purple-500 dark:text-purple-300 font-semibold">
                      🤖 AI playlist oluşturuluyor...
                    </p>
                    <WaveAnimation />
                  </div>
                )}

                {/* Sonuçlar */}
                <div
                  id="results"
                  className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                             gap-6 px-6 pb-20 relative z-10"
                >
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

                {/* PLAYER (modal kontrolü EKLİ) */}
                <MiniPlayer onOpenModal={() => setFullPlayerOpen(true)} />
                <FullPlayerModal
                  isOpen={fullPlayerOpen}
                  onClose={() => setFullPlayerOpen(false)}
                />
              </div>
            }
          />

          {/* FAVORİLER SAYFASI */}
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
