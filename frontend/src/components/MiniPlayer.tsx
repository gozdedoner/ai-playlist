import { usePlayer } from "../context/PlayerContext";

type Props = {
  onOpenModal: () => void;
};

export default function MiniPlayer({ onOpenModal }: Props) {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } =
    usePlayer();

  if (!currentTrack) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-black/40 backdrop-blur-xl p-3 
      flex items-center justify-between text-white z-40"
    >
      <div className="flex items-center gap-3">
        <img src={currentTrack.image} className="w-12 h-12 rounded-lg" alt="" />
        <div>
          <p className="font-semibold">{currentTrack.name}</p>
          <p className="text-sm opacity-70">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={prevTrack}>⏮</button>
        <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
        <button onClick={nextTrack}>⏭</button>
        <button onClick={onOpenModal}>🔼</button>
      </div>
    </div>
  );
}
