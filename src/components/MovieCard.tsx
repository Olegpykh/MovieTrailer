import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

const MAX_TILT = 6;

export default function MovieCard({ movie }: MediaCardProps) {
  if (!movie.poster_path) return null;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.favorites);

  const isMovie = 'title' in movie;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerName, setTrailerName] = useState('');
  const [credits, setCredits] = useState<PersonCreditsMovieCard[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const posterRef = useRef<HTMLDivElement | null>(null);

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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = posterRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height; 

    setTilt({
      x: (py - 0.5) * -MAX_TILT, 
      y: (px - 0.5) * MAX_TILT, 
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleCardClick = useCallback(() => {
    navigate(`/${isMovie ? 'movie' : 'tv'}/${movie.id}`);
  }, [navigate, isMovie, movie.id]);

  const handlePlayClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      openModal();
    },
    [openModal]
  );

  const title = movie.title || movie.name || 'No name';
  const releaseDate = movie.release_date || movie.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const poster = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  return (
    <>
      <div
        onClick={handleCardClick}
        className="relative flex flex-col w-full cursor-pointer select-none group"
        style={{ perspective: '800px' }}
      >
        <div
          ref={posterRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
              tilt.x || tilt.y ? 1.02 : 1
            })`,
            transformStyle: 'preserve-3d',
          }}
          className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-surface border border-ink/10 dark:border-ivory/10 shadow-subtle transition-transform duration-300 ease-smooth group-hover:shadow-lifted group-hover:border-ink/20 dark:group-hover:border-ivory/20"
        >
          {!isImageLoaded && (
            <div className="absolute inset-0 overflow-hidden bg-surface">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ink/5 dark:via-ivory/5 to-transparent animate-shimmer" />
            </div>
          )}

          <img
            src={poster}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
            className={`object-cover w-full h-full transition-opacity duration-500 ease-smooth ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 bg-void/40" />

          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 bg-void/30" />

          <button
            onClick={handlePlayClick}
            aria-label="Play trailer"
            className="absolute z-10 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium transition-all duration-300 rounded-full bottom-3 right-3 text-ivory bg-void/60 backdrop-blur-md ring-1 ring-ivory/20 hover:bg-champagne hover:text-void hover:ring-champagne active:scale-95"
          >
            <FaPlay className="text-[10px]" />
            <span className="hidden sm:inline">Trailer</span>
          </button>

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
