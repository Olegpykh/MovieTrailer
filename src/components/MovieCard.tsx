import React, { useState, useCallback, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  deleteFromFavorites,
} from '../store/features/favorites/favoritesSlice';

import {
  getMovieVideos,
  getTvVideos,
  getCreditsFromMovie,
  getCreditsFromTV,
} from '../api/index';

import Modal from './Modal';
import { RootState, AppDispatch } from '@/store/store';
import { Movie, TV } from '@/types/tmdb';
import {
  PersonCreditsMovieCard,
  CreditsResponseMovieCard,
} from '../types/tmdb';

type MediaCardProps = {
  movie: Movie | TV;
};

export default function MovieCard({ movie }: MediaCardProps) {
  if (!movie.poster_path) return null;

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerName, setTrailerName] = useState('');
  const [credits, setCredits] = useState<PersonCreditsMovieCard[]>([]);

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
      let videos;

      if ('title' in movie) {
        const res = await getMovieVideos(String(movie.id));
        videos = res.results || [];
      } else {
        const res = await getTvVideos(String(movie.id));
        videos = res.results || [];
      }

      const trailer = videos.find(
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
    const fetchCredits = async () => {
      try {
        let data: CreditsResponseMovieCard;

        if ('title' in movie) {
          data = await getCreditsFromMovie(String(movie.id));
        } else {
          data = await getCreditsFromTV(String(movie.id));
        }

        setCredits(data.cast || []);
      } catch (err) {
        console.error('Failed to load credits:', err);
      }
    };

    fetchCredits();
  }, [movie.id, movie]);

  const title = movie.title || movie.name || 'No name';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const poster = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  return (
    <>
      <div
        onClick={openModal}
        className="relative flex flex-col w-full cursor-pointer select-none group"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-surface border border-ink/10 dark:border-ivory/10 shadow-subtle transition-all duration-500 ease-smooth group-hover:scale-[1.02] group-hover:shadow-lifted group-hover:border-ink/20 dark:group-hover:border-ivory/20">
          <img
            src={poster}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-700 ease-smooth group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-void/40">
            <div className="flex items-center justify-center transition-all duration-500 transform scale-75 border rounded-full shadow-2xl text-ivory w-14 h-14 bg-ivory/15 backdrop-blur-md border-ivory/25 group-hover:scale-100 group-hover:bg-ivory/25">
              <FaPlay className="ml-0.5 text-sm drop-shadow-md" />
            </div>
          </div>

          <button
            onClick={onFavoriteClick}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            className="absolute z-10 p-2 transition-all duration-300 rounded-full top-3 right-3 text-ink dark:text-ivory hover:scale-110 active:scale-95"
          >
            {isFavorite ? (
              <FaHeart className="text-champagne-dim dark:text-champagne drop-shadow-[0_0_10px_rgba(201,168,118,0.45)] text-base" />
            ) : (
              <FaRegHeart className="text-base transition-colors text-ink/70 dark:text-ivory/70 hover:text-ink dark:hover:text-ivory drop-shadow-md" />
            )}
          </button>

          {movie.vote_average ? (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md bg-void/40 backdrop-blur-md text-[11px] font-medium text-ivory shadow-subtle">
              <FaStar className="text-champagne text-[10px]" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          ) : null}
        </div>

        <div className="px-1 mt-3">
          <h3 className="text-sm font-medium truncate text-ink dark:text-ivory/90">
            {title}
          </h3>
          <p className="text-xs font-light text-muted mt-0.5">{year}</p>
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
          allCredits={credits}
        />
      )}
    </>
  );
}
