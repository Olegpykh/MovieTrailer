import React, { useState, useCallback, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../store/features/favorites/favoritesSlice';
import { getMovieVideos, getTvVideos } from '../api/index';
import { getCreditsFromMovie, getCreditsFromTV } from '../api/index';
import Modal from './Modal';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerName, setTrailerName] = useState('');
  const [castTV, setCastTV] = useState([]);
  const [castMovie, setCastMovie] = useState([]);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const onFavoriteClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (isFavorite) {
        dispatch(deleteFromFavorites({ id: movie.id }));
      } else {
        dispatch(addToFavorites(movie));
      }
    },
    [dispatch, isFavorite, movie]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTrailerKey(null);
    setTrailerName('');
  }, []);

  const openModal = useCallback(async () => {
    setIsModalOpen(true);

    try {
      const [movieVideos, tvVideos] = await Promise.all([
        getMovieVideos(movie.id),
        getTvVideos(movie.id),
      ]);

      const allVideos = [...movieVideos, ...tvVideos];

      const trailer = allVideos.find(
        (v) => v.site === 'YouTube' && ['Trailer'].includes(v.type)
      );

      setTrailerKey(trailer?.key || null);
      setTrailerName(trailer?.name || '');
    } catch (err) {
      console.error('Failed to load trailer:', err);
      setTrailerKey(null);
      setTrailerName('');
    }
  }, [movie]);

  useEffect(() => {
    const fetchTvCredits = async () => {
      const data = await getCreditsFromTV(movie.id);
      console.log(data);

      setCastTV(data);
    };
    fetchTvCredits();
  }, [movie.id]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const data = await getCreditsFromMovie(movie.id);
      console.log(data);

      setCastMovie(data);
    };
    fetchMovieCredits();
  }, [movie.id]);

  const allCredits = [...castTV, ...castMovie];
  console.log(allCredits);

  const title = movie.title || movie.name || 'No name';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image&font=roboto';

  return (
    <>
      <div
        onClick={openModal}
        className="relative w-full max-w-md mx-auto overflow-hidden transition-all duration-300 shadow-lg cursor-pointer group rounded-2xl hover:scale-105 hover:shadow-2xl"
      >
        <div className="relative aspect-[2/3] bg-gray-900">
          <img
            src={poster}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-900 group-hover:scale-110"
          />

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

          {movie.vote_average ? (
            <div className="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white rounded-full bottom-3 left-3 bg-black/70 backdrop-blur-sm">
              <FaStar className="text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          ) : null}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          movie={movie}
          year={year}
          closeModal={closeModal}
          poster={poster}
          title={title}
          trailerKey={trailerKey}
          trailerName={trailerName}
          allCredits={allCredits}
        />
      )}
    </>
  );
}
