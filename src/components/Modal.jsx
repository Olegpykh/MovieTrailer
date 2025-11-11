import React from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Modal({
  movie,
  closeModal,
  poster,
  title,
  trailerKey,
  trailerName,
  year,
  allCredits = [],
}) {
  const navigate = useNavigate();
  const topCast = allCredits.filter((actor) => actor.profile_path).slice(0, 6);

  const handleActorClick = (id) => {
    navigate(`/person/${id}`);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-xl"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-5xl my-10 overflow-hidden shadow-2xl rounded-3xl bg-neutral-950 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 transition-all rounded-full bg-white/10 top-5 right-5 hover:bg-white/25 backdrop-blur-md"
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5 text-white" />
        </button>

        <div className="flex flex-col gap-10 p-8 md:flex-row">
                                              {/* LEFT  */}
          <div className="flex flex-col w-full space-y-8 md:w-2/5 md:sticky md:top-0 md:self-start">
            <div className="flex items-center justify-center">
              <img
                src={poster}
                alt={title}
                className="max-h-[50vh] w-auto object-contain rounded-2xl shadow-xl ring-1 ring-white/10"
              />
            </div>

            {topCast.length > 0 && (
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-400 uppercase">
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
                          className="object-cover w-20 h-20 transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <p className="text-xs font-medium text-center text-white line-clamp-2">
                        {actor.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

                                    {/* RIGHT */}
          <div className="flex flex-col w-full space-y-8 md:w-3/5">
            <div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-4">
                <FaStar className="w-6 h-6 text-yellow-400" />
                <span className="text-xl font-semibold text-white">
                  {movie.vote_average?.toFixed(1) ?? 'N/A'}
                </span>
                <span className="text-lg text-gray-500">• {year}</span>
              </div>
              <p className="mt-6 text-base leading-relaxed text-gray-300">
                {movie.overview || 'No description available.'}
              </p>
            </div>

            {trailerKey ? (
              <div>
                <p className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
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
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
