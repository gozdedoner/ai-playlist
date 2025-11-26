export default {
  darkMode: "class", // ✔ DARK MODE BURADA AKTİF OLUR
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        softPink: "#f8bfe0",
        lavender: "#c9c3ff",
        babyBlue: "#cce7ff",
        peach: "#ffd4c2",
        mint: "#c2f7e4",
        cloud: "#f5f7fa",
      },
      animation: {
        wave: "wave 1s infinite ease-in-out",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
      },

      backgroundImage: {
        "pastel-gradient": "linear-gradient(135deg, #f0f4ff, #e7f7ff, #fde2ff)",
        "dark-gradient": "linear-gradient(135deg, #1e1e1e, #121212)",
      },
    },
  },
  plugins: [],
};
