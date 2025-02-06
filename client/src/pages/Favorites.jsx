import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../services/favoriteService";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (err) {
      setMessage("Failed to load favorites.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id);
      setMessage("Favorite removed!");
      fetchFavorites(); // Refresh list
    } catch (err) {
      setMessage("Failed to remove favorite.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Favorite Events</h1>
      {message && <p className="text-green-500">{message}</p>}

      <div>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} className="p-2 border-b flex justify-between items-center">
              <div>
                <h2 className="font-bold">{fav.eventText}</h2>
                <p className="text-gray-600">Date: {fav.eventDate}</p>
                {fav.eventLink && (
                  <a href={fav.eventLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Read more
                  </a>
                )}
              </div>
              <button onClick={() => handleDelete(fav.id)} className="bg-red-500 text-white px-2 py-1 rounded">🗑️ Remove</button>
            </div>
          ))
        ) : (
          <p>No favorites saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
