import SongCard from "../components/SongCard";

type Props = {
  favorites: any[];
  toggleFavorite: (t: any) => void;
};

export default function FavoritesPage({ favorites, toggleFavorite }: Props) {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((track) => (
        <SongCard
          key={track.id}
          track={track}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
