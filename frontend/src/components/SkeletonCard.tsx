

export default function SkeletonCard() {
  return (
    <div
      className="animate-pulse bg-white/40 dark:bg-black/30
               backdrop-blur-xl p-4 rounded-xl shadow-md
               border border-white/20 dark:border-gray-700"
    >
      <div className="w-full h-48 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 mt-3 rounded"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 w-1/2 mt-2 rounded"></div>
    </div>
  );
}
