import { Movie, PersonCreditsMovieCard, TV } from '@/types/tmdb';
import React from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  movie: Movie | TV;
  closeModal: () => void;
  poster: string | null;
  title: string | null;
  trailerKey: string | null;
  trailerName: string;
  year: number | 'N/A';
  allCredits: PersonCreditsMovieCard[];
}

export default function Modal({
  movie,
  closeModal,
  poster,
  title,
  trailerKey,
  trailerName,
  year,
  allCredits = [],
}: ModalProps) {
  const navigate = useNavigate();
  const topCast = allCredits.filter((actor) => actor.profile_path).slice(0, 6);

  const handleActorClick = (id: number) => {
    navigate(`/person/${id}`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl">
      <div
        className="absolute inset-0 transition-opacity duration-1000 shadow-lg shadow-amber-500 backdrop-blur-lg "
        onClick={closeModal}
      />
      <div
        className="relative w-full max-w-5xl max-h-[95vh] my-12 overflow-y-auto shadow-5xl rounded-3xl ring-1 ring-white/10 text-black bg-white dark:bg-black dark:text-white "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-0 z-10 p-2 mt-5 transition-all duration-300 rounded-full right-5 bg-white/10 hover:bg-white/25 backdrop-blur-md"
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5 text-black dark:text-white" />
        </button>

        <div className="flex flex-col gap-6 p-6 md:flex-row">
          <div className="flex flex-col items-center w-full space-y-6 md:w-2/5">
            <div className="flex justify-center w-full px-4">
              <img
                src={poster}
                alt={title}
                className="object-contain w-full h-auto max-w-md mx-auto bg-black shadow-xl rounded-2xl ring-1 ring-white/10"
              />
            </div>
            {topCast.length > 0 && (
              <div className="w-full">
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-black uppercase dark:text-white">
                  Top Cast
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {topCast.map((actor) => (
                    <button
                      key={actor.id}
                      onClick={() => handleActorClick(actor.id)}
                      className="flex flex-col items-center space-y-2 transition-all group hover:scale-105"
                    >
                      <div className="overflow-hidden rounded-full shadow-lg ring-2 ring-white/20">
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="object-cover w-24 h-24 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <p className="text-xs font-medium text-center text-black dark:text-white line-clamp-2">
                        {actor.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full space-y-6 md:w-3/5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight dark:text-white md:text-4xl">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <FaStar className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-semibold dark:text-white">
                  {movie.vote_average?.toFixed(1) ?? 'N/A'}
                </span>
                <span className="text-base dark:text-white">• {year}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed dark:text-white">
                {movie.overview || 'No description available.'}
              </p>
            </div>
            {trailerKey && (
              <div>
                <p className="mb-3 text-xs font-semibold tracking-widest uppercase dark:text-yellow-400">
                  {trailerName}
                </p>
                <div className="overflow-hidden shadow-2xl rounded-2xl ring-1 ring-white/10">
                  <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1`}
                    title="Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
