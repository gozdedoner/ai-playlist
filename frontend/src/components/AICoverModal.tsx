import { useState } from "react";

export default function AICoverGeneratorModal({
  onClose,
  onGenerate,
}: {
  onClose: () => void;
  onGenerate: (style: string, theme: string) => void;
}) {
  const [style, setStyle] = useState("Neon Glow");
  const [theme, setTheme] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-[400px] shadow-2xl border border-white/20">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100 text-center">
          🎨 AI Cover Generator
        </h2>

        {/* Style Select */}
        <label className="block mb-2 text-sm font-medium dark:text-gray-300">
          Görsel Stili
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border dark:bg-gray-800 dark:text-gray-100 mb-4"
        >
          <option>Neon Glow</option>
          <option>Pastel Soft</option>
          <option>Synthwave Retro</option>
          <option>Cyberpunk</option>
          <option>Dark Moody Pop</option>
        </select>

        {/* Theme Input */}
        <label className="block mb-2 text-sm font-medium dark:text-gray-300">
          Tema (örn: "lofi", "enerjik", "romantik")
        </label>
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Tema gir..."
          className="w-full px-3 py-2 rounded-xl border dark:bg-gray-800 dark:text-gray-100 mb-6"
        />

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 w-1/2 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            İptal
          </button>

          <button
            onClick={() => onGenerate(style, theme)}
            className="px-4 py-2 w-1/2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition"
          >
            Üret 🎨
          </button>
        </div>
      </div>
    </div>
  );
}
