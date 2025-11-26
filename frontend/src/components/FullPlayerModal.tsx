import { usePlayer } from "../context/PlayerContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FullPlayerModal({ isOpen, onClose }: Props) {
  const {
    currentTrack,
    isPlaying,
    progress,
    togglePlay,
    nextTrack,
    prevTrack,
    setProgress,
  } = usePlayer();

  if (!isOpen || !currentTrack) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-xl flex items-center justify-center p-4">
      <div
        className="bg-white/15 dark:bg-black/30 p-6 rounded-3xl shadow-2xl border border-white/10 
                   w-full max-w-md flex flex-col items-center text-center"
      >
        {/* COVER */}
        <img
          src={currentTrack.image}
          className="w-64 h-64 object-cover rounded-2xl mb-6 shadow-xl"
        />

        {/* INFO */}
        <h2 className="text-2xl font-bold text-white">{currentTrack.name}</h2>
        <p className="text-purple-200 mb-4">{currentTrack.artist}</p>

        {/* PROGRESS BAR */}
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full mb-4"
        />

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prevTrack}
            className="text-white text-3xl hover:scale-110 transition"
          >
            ⏮
          </button>

          <button
            onClick={togglePlay}
            className="text-white text-4xl hover:scale-110 transition"
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>

          <button
            onClick={nextTrack}
            className="text-white text-3xl hover:scale-110 transition"
          >
            ⏭
          </button>
        </div>
      </div>

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl"
      >
        ✖
      </button>
    </div>
  );
}
