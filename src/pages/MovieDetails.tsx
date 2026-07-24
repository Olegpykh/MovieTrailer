import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMovieDetails,
  getTvDetails,
  getMovieVideos,
  getTvVideos,
  getCreditsFromMovie,
  getCreditsFromTV,
  getSimilarMovies,
  getSimilarTv,
} from '../api';
import {
  setMovieDetails,
  setVideos,
  setCast,
  setSimilar,
} from '../store/features/movies/movieSlice';
import { setTvDetails } from '../store/features/tv/tvSlice';
import { setLoading, setError } from '../store/features/ui/uiSlice';
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
import { RootState, AppDispatch } from '@/store/store';
import CategoryRow from '../components/CategoryRow';

export default function MediaDetails() {
  const { id, type } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { movieDetails, videos, cast, similar } = useSelector(
    (state: RootState) => state.movies
  );
  const { tvDetails } = useSelector((state: RootState) => state.tv);
  const { isLoading } = useSelector((state: RootState) => state.ui);

  const mediaId = Number(id);

  const [trailerModal, setTrailerModal] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      if (!id || !type) return;

      dispatch(setLoading(true));

      dispatch(setMovieDetails(null));
      dispatch(setTvDetails(null));
      dispatch(setVideos([]));
      dispatch(setCast([]));
      dispatch(setSimilar([]));

      try {
        if (type === 'movie') {
          const mediaData = await getMovieDetails(mediaId);
          const creditsData = await getCreditsFromMovie(id);
          const videosData = await getMovieVideos(id);
          const similarData = await getSimilarMovies(id);

          dispatch(setMovieDetails(mediaData ?? null));
          dispatch(setCast(creditsData.cast || []));
          dispatch(setVideos(videosData.results || []));
          dispatch(setSimilar(similarData || []));
        } else {
          const mediaData = await getTvDetails(mediaId);
          const creditsData = await getCreditsFromTV(id);
          const videosData = await getTvVideos(id);
          const similarData = await getSimilarTv(id);

          dispatch(setTvDetails(mediaData ?? null));
          dispatch(setCast(creditsData.cast || []));
          dispatch(setVideos(videosData.results || []));
          dispatch(setSimilar(similarData || []));
        }
      } catch (err) {
        dispatch(setError('Failed to load data'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAll();
  }, [id, type, dispatch]);

  const media = movieDetails || tvDetails;
  const isMovie = !!movieDetails;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-paper dark:bg-void">
        <span className="relative flex w-8 h-8">
          <span className="absolute inset-0 border-2 rounded-full border-champagne/20" />
          <span className="absolute inset-0 border-2 border-transparent rounded-full border-t-champagne animate-spin" />
        </span>
        <span className="text-xs font-medium tracking-[0.25em] uppercase text-muted">
          Loading
        </span>
      </div>
    );
  }

  if (!media) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center bg-paper dark:bg-void text-ink dark:text-ivory">
        <p className="text-lg font-medium">Media not found</p>
        <Link
          to="/"
          className="text-sm font-medium text-champagne-dim dark:text-champagne hover:opacity-75"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const trailer =
    videos?.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
    ) || videos?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const youtubeId = trailer?.key;

  const title = isMovie ? media?.title : media?.name;
  const releaseDate = isMovie ? media?.release_date : media?.first_air_date;
  const backdrop = media.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${media.backdrop_path}`
    : null;
  const poster = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : null;

  const runtime = isMovie
    ? media?.runtime
      ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
      : '—'
    : media?.episode_run_time?.[0]
    ? `${media.episode_run_time[0]} min/ep`
    : '—';

  return (
    <>
      <div className="min-h-screen bg-paper text-ink dark:bg-void dark:text-ivory">
        <div className="relative">
          {backdrop && (
            <div className="absolute inset-0">
              <img
                src={backdrop}
                alt=""
                className="object-cover w-full h-full mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/85 to-paper/40 dark:from-void dark:via-void/85 dark:to-void/40"></div>
            </div>
          )}

          <div className="relative z-10 px-6 pt-32 pb-20 mx-auto max-w-7xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition text-champagne-dim dark:text-champagne hover:opacity-75"
            >
              <FaArrowLeft className="text-xs" /> Back
            </Link>

            <div className="flex flex-col gap-12 md:flex-row">
              <div className="flex-shrink-0">
                {poster ? (
                  <img
                    src={poster}
                    alt={title}
                    className="mx-auto w-72 rounded-2xl ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-72 h-[26rem] bg-surface rounded-2xl flex items-center justify-center text-6xl font-medium text-muted ring-1 ring-ink/10 dark:ring-ivory/10">
                    ?
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                      {title}
                    </h1>
                    {isMovie ? (
                      <FaFilm className="text-xl text-champagne-dim dark:text-champagne" />
                    ) : (
                      <FaTv className="text-xl text-champagne-dim dark:text-champagne" />
                    )}
                  </div>

                  {media.tagline && (
                    <p className="mt-3 text-lg italic font-light text-ink/50 dark:text-ivory/50">
                      {media.tagline}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-6 mt-5 text-sm text-ink/60 dark:text-ivory/60">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-xs text-champagne-dim dark:text-champagne" />
                      <span>
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
                      <FaClock className="text-xs text-champagne-dim dark:text-champagne" />
                      <span>{runtime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-xs text-champagne-dim dark:text-champagne" />
                      <span className="font-medium">
                        {media.vote_average?.toFixed(1) ?? '—'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {media.genres?.map((g) => (
                    <Link
                      key={g.id}
                      to={`/discover?type=${isMovie ? 'movie' : 'tv'}&genre=${
                        g.id
                      }`}
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full bg-ink/5 dark:bg-ivory/10 text-ink/70 dark:text-ivory/70 hover:bg-champagne hover:text-void transition-colors duration-300"
                    >
                      {g.name}
                    </Link>
                  ))}
                </div>

                <div className="text-base leading-relaxed text-ink/70 dark:text-ivory/70">
                  <h2 className="mb-3 text-[11px] font-medium tracking-[0.2em] uppercase text-muted">
                    Overview
                  </h2>
                  <p>{media.overview || 'No overview available.'}</p>
                </div>

                {youtubeId ? (
                  <button
                    onClick={() => setTrailerModal(true)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium transition-all rounded-full bg-ink dark:bg-ivory text-paper dark:text-void hover:opacity-90"
                  >
                    <FaPlay className="text-xs" /> Play Trailer
                  </button>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium rounded-full bg-ink/5 dark:bg-ivory/10 text-muted cursor-not-allowed"
                  >
                    <FaPlay className="text-xs" /> No Trailer Available
                  </button>
                )}
              </div>
            </div>

            {cast.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-6 h-[2px] bg-champagne" />
                  <h2 className="text-xl font-semibold tracking-wide">
                    Top Cast
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {cast
                    .slice(0, 18)
                    .filter((actor) => actor.profile_path)
                    .map((actor) => (
                      <Link
                        key={actor.id}
                        to={`/person/${actor.id}`}
                        className="block text-center transition-opacity group hover:opacity-80"
                      >
                        {actor.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className="object-cover w-full aspect-[2/3] rounded-2xl ring-1 ring-ink/10 dark:ring-ivory/10 shadow-subtle transition-transform duration-500 ease-smooth group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full text-4xl font-medium aspect-[2/3] rounded-2xl bg-surface text-muted ring-1 ring-ink/10 dark:ring-ivory/10">
                            ?
                          </div>
                        )}
                        <p className="mt-3 text-sm font-medium line-clamp-2 text-ink dark:text-ivory/90">
                          {actor.name}
                        </p>
                        <p className="text-xs text-muted line-clamp-2">
                          {actor.character}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {similar.length > 0 && (
              <div className="mt-20">
                <CategoryRow
                  title="More Like This"
                  items={similar}
                  onLoadMore={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {trailerModal && youtubeId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void/70 backdrop-blur-md"
          onClick={() => setTrailerModal(false)}
        >
          <div
            className="relative w-full max-w-5xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTrailerModal(false)}
              className="absolute right-0 text-2xl transition -top-12 text-ivory/70 hover:text-ivory"
            >
              <FaTimes />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title="Official Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl shadow-lifted"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
