


export default function WaveAnimation() {
  return (
    <div className="flex justify-center mt-3">
      <div className="flex items-center gap-1">
        <div className="w-2 h-6 bg-purple-400 dark:bg-purple-300 rounded animate-wave"></div>
        <div className="w-2 h-6 bg-purple-400 dark:bg-purple-300 rounded animate-wave delay-100"></div>
        <div className="w-2 h-6 bg-purple-400 dark:bg-purple-300 rounded animate-wave delay-200"></div>
        <div className="w-2 h-6 bg-purple-400 dark:bg-purple-300 rounded animate-wave delay-300"></div>
        <div className="w-2 h-6 bg-purple-400 dark:bg-purple-300 rounded animate-wave delay-500"></div>
      </div>
    </div>
  );
}
