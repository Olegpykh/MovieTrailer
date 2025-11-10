import React from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

export default function Modal({
  movie,
  closeModal,
  poster,
  title,
  trailerKey,
  trailerName,
  year,
}) {
  return (
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
          <FaTimes className="text-2xl" />
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
              <p className="leading-relaxed text-gray-300">{movie.overview}</p>
            ) : (
              <p className="italic text-gray-500">No description available.</p>
            )}

            <div className="mt-6">
              {trailerKey ? (
                <>
                  <p className="mb-2 text-sm italic text-gray-400">
                    {trailerName}
                  </p>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </>
              ) : (
                <p className="italic text-gray-500">Trailer not available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
