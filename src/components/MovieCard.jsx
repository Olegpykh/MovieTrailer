import React, { useContext, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaTimes } from 'react-icons/fa';
import { FavoritesContext } from '../context/FavoritesContext';

export default function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const onFavoriteClick = (e) => {
    e.stopPropagation();
    isFavorite ? removeFromFavorites(movie) : addToFavorites(movie);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Карточка — только постер + иконки */}
      <div
        onClick={openModal}
        className="group relative w-full max-w-md mx-auto cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div className="relative aspect-[2/3] bg-gray-900">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Сердечко */}
          <button
            onClick={onFavoriteClick}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2.5 text-lg shadow-md transition-all hover:scale-110"
          >
            {isFavorite ? (
              <FaHeart className="text-red-600 drop-shadow" />
            ) : (
              <FaRegHeart className="text-gray-600 drop-shadow" />
            )}
          </button>

          {/* Рейтинг */}
          {movie.vote_average ? (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <FaStar className="text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-gray-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Крестик */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Постер */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300'
                }
                alt={movie.title}
                className="w-full md:w-48 h-auto rounded-lg shadow-lg"
              />

              {/* Информация */}
              <div className="flex-1 space-y-3">
                <h2 className="text-2xl font-bold text-white">{movie.title}</h2>

                <div className="flex items-center gap-2 text-yellow-400">
                  <FaStar />
                  <span className="font-medium">
                    {movie.vote_average?.toFixed(1) ?? 'N/A'}
                  </span>
                  <span className="text-gray-400">
                    • {movie.release_date?.split('-')[0] ?? 'N/A'}
                  </span>
                </div>

                {movie.overview ? (
                  <p className="text-gray-300 leading-relaxed">
                    {movie.overview}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
