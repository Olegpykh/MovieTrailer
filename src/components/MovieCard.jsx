import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  function onFavoriteClick() {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/150'
          }
          alt={movie.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <div className="absolute bottom-2 right-2">
          <button
            onClick={onFavoriteClick}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 ${
              isFavorite
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-400 dark:text-gray-500'
            } hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200`}
          >
            {isFavorite ? '❤️' : '🖤'}
          </button>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {movie.release_date?.split('-')[0] || 'N/A'}
        </p>
      </div>
    </div>
  );
}
