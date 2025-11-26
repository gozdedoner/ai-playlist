import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-2xl bg-white/20 p-2 rounded-xl shadow"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
