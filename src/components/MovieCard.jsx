import React, { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FavoritesContext } from '../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const onFavoriteClick = (e) => {
    e.stopPropagation(); 
    isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Контейнер для постера */}
      <div className="relative w-full aspect-[3/4]">
    
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/150'
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Кнопка "избранное" */}
        <button
          onClick={onFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 text-xl"
        >
          {isFavorite ? (
            <FaHeart className="text-red-600 dark:text-red-400" />
          ) : (
            <FaRegHeart className="text-gray-400 dark:text-gray-500" />
          )}
        </button>
      </div>
      {/* Контейнер для текста */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white truncate">{movie.title}</h3>
        <p className="text-gray-300">
          {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
        </p>
      </div>
    </div>
  );
}
