export default function HomeGlassPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        w-full max-w-3xl mx-auto mt-10 p-10
        rounded-3xl backdrop-blur-xl
        bg-white/10 dark:bg-gray-800/20
        border border-white/20 shadow-2xl
        relative
      "
    >
      {children}

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-400/20 blur-3xl -z-10"></div>
    </div>
  );
}
