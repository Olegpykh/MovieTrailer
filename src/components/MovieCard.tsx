import React, { useState, useCallback, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../store/features/favorites/favoritesSlice';
import { getMovieVideos, getTvVideos } from '../api/index';
import { getCreditsFromMovie, getCreditsFromTV } from '../api/index';
import Modal from './Modal';
import { RootState, AppDispatch } from '@/store/store';
import { Movie, TV } from '@/types/tmdb';
import {PersonCreditsMovieCard,CreditsResponseMovieCard} from "../types/tmdb"

type MediaCardProps = {
  movie: Movie | TV;
};


export default function MovieCard({ movie }: MediaCardProps) {

  
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerName, setTrailerName] = useState<string>('');
  const [castTV, setCastTV] = useState<PersonCreditsMovieCard[]>([]);
  const [castMovie, setCastMovie] = useState<PersonCreditsMovieCard[]>([]);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const onFavoriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
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
        getMovieVideos(String(movie.id)),
        getTvVideos(String(movie.id)),
      ]);
      console.log(movieVideos, tvVideos);

      const allVideos = [
        ...(movieVideos.results || []),
        ...(tvVideos.results || []),
      ];

      const trailer = allVideos.find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer'
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
      const data:CreditsResponseMovieCard = await getCreditsFromTV(String(movie.id));
      console.log(data.cast);

      setCastTV(data.cast);
    };
    fetchTvCredits();
  }, [movie.id]);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const data:CreditsResponseMovieCard = await getCreditsFromMovie(String(movie.id));
      console.log(data);

      setCastMovie(data.cast);
    };
    fetchMovieCredits();
  }, [movie.id]);


  const allCredits = [...castMovie, ...castTV];

  

  const title:string = movie.title || movie.name || 'No name';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : 'https://placehold.co/300x450/1a1a1a/ffffff?text=No+Image&font=roboto';

  return (
    <>
      <div
        onClick={openModal}
        className="relative w-full max-w-3xl mx-auto mb-10 overflow-hidden transition-all duration-300 shadow-lg cursor-pointer group rounded-2xl hover:shadow-2xl"
      >
        <div className="relative bg-gray-900">
          <img
            src={poster}
            alt={title}
            className="object-contain w-full h-auto transition-transform duration-900 "
          />

          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
            <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 transform scale-0 rounded-full bg-white/20 backdrop-blur-md group-hover:scale-100">
              <FaPlay className="ml-1 text-3xl text-white" />
            </div>
          </div>

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
