import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMovieDetails,
  getTvDetails,
  getMovieVideos,
  getTvVideos,
} from '../api';
import {
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaPlay,
  FaArrowLeft,
  FaTv,
  FaFilm,
  FaTimes,
} from 'react-icons/fa';

export default function MediaDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [tvDetails, setTvDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerModal, setTrailerModal] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [movieData, tvData] = await Promise.all([
          getMovieDetails(id).catch(() => null),
          getTvDetails(id).catch(() => null),
        ]);

        const mediaData = movieData || tvData;
        if (!mediaData) throw new Error('Not found');

        setMovieDetails(movieData);
        setTvDetails(tvData);

        const videoFn = movieData ? getMovieVideos : getTvVideos;
        const videoData = await videoFn(id);
        setVideos(videoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  const media = movieDetails || tvDetails;
  const isMovie = !!movieDetails;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="w-16 h-16 border-4 rounded-full border-t-yellow-400 border-white/20 animate-spin"></div>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-neutral-950">
        <p className="text-2xl">Media not found</p>
        <Link to="/" className="mt-4 text-yellow-400 hover:underline">
          Back
        </Link>
      </div>
    );
  }

  const trailer =
    videos.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
    ) || videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const youtubeId = trailer?.key;

  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const backdrop = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`
    : null;
  const poster = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : null;

  const runtime = isMovie
    ? media.runtime
      ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
      : '—'
    : media.episode_run_time?.[0]
    ? `${media.episode_run_time[0]} min/ep`
    : '—';

  return (
    <>
      <div className="min-h-screen text-white bg-neutral-950">
        <div className="relative">
          {backdrop && (
            <div className="absolute inset-0">
              <img
                src={backdrop}
                alt=""
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
              <div className="absolute inset-0 bg-neutral-950/70"></div>
            </div>
          )}

          <div className="relative z-10 px-6 pt-32 pb-20 mx-auto max-w-7xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 text-yellow-400 hover:text-yellow-300"
            >
              <FaArrowLeft /> Back
            </Link>

            <div className="flex flex-col gap-12 md:flex-row">
              <div className="flex-shrink-0">
                {poster ? (
                  <img
                    src={poster}
                    alt={title}
                    className="shadow-2xl w-80 rounded-3xl ring-2 ring-white/20"
                  />
                ) : (
                  <div className="w-80 h-[30rem] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl flex items-center justify-center text-9xl font-bold text-gray-700 shadow-2xl">
                    ?
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
                      {title}
                    </h1>
                    {isMovie ? (
                      <FaFilm className="text-4xl text-yellow-400" />
                    ) : (
                      <FaTv className="text-4xl text-yellow-400" />
                    )}
                  </div>

                  {media.tagline && (
                    <p className="mt-4 text-2xl italic font-light text-gray-400">
                      {media.tagline}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-400" />
                      <span className="text-lg">
                        {releaseDate
                          ? new Date(releaseDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-yellow-400" />
                      <span className="text-lg">{runtime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span className="text-lg font-semibold">
                        {media.vote_average?.toFixed(1)} / 10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {media.genres?.map((g) => (
                    <span
                      key={g.id}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>

                <div className="text-lg leading-relaxed text-gray-300">
                  <h2 className="mb-4 text-2xl font-bold text-white">
                    Overview
                  </h2>
                  <p>{media.overview || 'No overview available.'}</p>
                </div>

                {youtubeId ? (
                  <button
                    onClick={() => setTrailerModal(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-black transition-all bg-yellow-400 rounded-full hover:bg-yellow-300 hover:scale-105"
                  >
                    <FaPlay /> Play Trailer
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-gray-500 bg-gray-800 rounded-full cursor-not-allowed"
                  >
                    <FaPlay /> No Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {trailerModal && youtubeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setTrailerModal(false)}
        >
          <div
            className="relative w-full max-w-5xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTrailerModal(false)}
              className="absolute right-0 text-4xl transition -top-12 text-white/70 hover:text-white"
            >
              <FaTimes />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="Trailer"
                allowFullScreen
                className="w-full h-full shadow-2xl rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
