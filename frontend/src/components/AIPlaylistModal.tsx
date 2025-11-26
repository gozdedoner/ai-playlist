import { useState } from "react";

type Props = {
  onClose: () => void;
  onGenerate: (prompt: string) => void;
};

export default function AIPlaylistModal({ onClose, onGenerate }: Props) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-2xl w-80">
        <h2 className="text-lg font-bold mb-3 text-gray-700 dark:text-gray-200">
          🎧 AI Playlist Prompt
        </h2>

        <textarea
          className="w-full p-3 rounded-lg dark:bg-gray-800 dark:text-gray-200 border"
          placeholder="Örnek: Chill lofi, yağmurlu hava, sakin vibe"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 dark:text-white"
          >
            Kapat
          </button>

          <button
            onClick={() => onGenerate(prompt)}
            className="px-4 py-2 rounded bg-purple-500 text-white hover:scale-105"
          >
            Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}
