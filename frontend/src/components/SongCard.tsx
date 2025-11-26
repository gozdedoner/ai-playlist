import { usePlayer } from "../context/PlayerContext";

type SongCardProps = {
  track: any;
  favorites: any[];
  toggleFavorite: (t: any) => void;
};

export default function SongCard({
  track,
  favorites,
  toggleFavorite,
}: SongCardProps) {
  const { openPlayer } = usePlayer();

  const isFavorite = favorites.some((fav) => fav.id === track.id);

  return (
    <div
      className="bg-white/40 dark:bg-black/30 backdrop-blur-xl p-4 
      rounded-xl shadow cursor-pointer transition hover:-translate-y-1"
      onClick={() =>
        openPlayer({
          id: track.id,
          name: track.name,
          artist: track.artists.map((a: any) => a.name).join(", "),
          image: track.album.images[0]?.url,
          preview: track.preview_url,
        })
      }
    >
      <img
        src={track.album.images[0]?.url}
        className="rounded-xl w-full h-48 object-cover"
      />

      <h2 className="mt-2 font-semibold text-gray-800 dark:text-gray-200">
        {track.name}
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {track.artists.map((a: any) => a.name).join(", ")}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(track);
        }}
        className="text-2xl float-right"
      >
        {isFavorite ? "💗" : "🤍"}
      </button>
    </div>
  );
}
