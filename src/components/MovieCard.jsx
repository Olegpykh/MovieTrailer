import React, { useContext, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaTimes } from 'react-icons/fa';
import { FavoritesContext } from '../context/FavoritesContext';
import { getMovieVideos, getTvVideos } from '../api/movie/videos';

export default function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerName, setTrailerName] = useState('');

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const onFavoriteClick = (e) => {
    e.stopPropagation();
    isFavorite ? removeFromFavorites(movie) : addToFavorites(movie);
  };

  const openModal = async () => {
    setIsModalOpen(true);

    try {
      const [movieVideos, tvVideos] = await Promise.all([
        getMovieVideos(movie.id),
        getTvVideos(movie.id),
      ]);

      const allVideos = [...movieVideos, ...tvVideos];

      console.log('All videos:', allVideos);

      const trailer = allVideos.find(
        (v) =>
          v.site === 'YouTube' &&
          ['Trailer', 'Teaser', 'Clip', 'Featurette'].includes(v.type)
      );

      setTrailerKey(trailer?.key || null);
      setTrailerName(trailer?.name || '');
    } catch (err) {
      console.error('❌ Ошибка при загрузке трейлера:', err);
      setTrailerKey(null);
      setTrailerName('');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerKey(null);
    setTrailerName('');
  };

  const title = movie.title || movie.name || 'No name';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image&font=roboto';

  return (
    <>
      {/* Карточка */}
      <div
        onClick={openModal}
        className="relative w-full max-w-md mx-auto overflow-hidden transition-all duration-300 shadow-lg cursor-pointer group rounded-2xl hover:scale-105 hover:shadow-2xl"
      >
        <div className="relative aspect-[2/3] bg-gray-900">
          <img
            src={poster}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
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
            <div className="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white rounded-full bottom-3 left-3 bg-black/70 backdrop-blur-sm">
              <FaStar className="text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-2xl bg-black/90 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-white"
            >
              <FaTimes className="text-2xl text-white rounded-full bg-black-300" />
            </button>

            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-shrink-0 w-full md:w-1/3">
                <img
                  src={poster}
                  alt={title}
                  className="object-cover w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-bold text-white">{title}</h2>

                <div className="flex items-center gap-2 text-yellow-400">
                  <FaStar />
                  <span className="font-medium">
                    {movie.vote_average?.toFixed(1) ?? 'N/A'}
                  </span>
                  <span className="text-gray-400">• {year}</span>
                </div>

                {movie.overview ? (
                  <p className="leading-relaxed text-gray-300">
                    {movie.overview}
                  </p>
                ) : (
                  <p className="italic text-gray-500">
                    No description available.
                  </p>
                )}

                {/* Трейлер с помощью iframe */}
                <div className="mt-6 w-full h-[360px] rounded-none overflow-hidden ">
                  {trailerKey ? (
                    <>
                      <p className="mb-2 text-sm italic text-gray-400">
                        {trailerName}
                      </p>
                      <iframe
                        width="90%"
                        height="90%"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </>
                  ) : (
                    <p className="italic text-gray-500">
                      Trailer not available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
