import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import {
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieNowPlaying,
} from '../api/index';
import {
  setMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setFeaturedMovies,
  setLoading,
  setError,
  resetAll,
} from '../store/features/movies/movieSlice';
import { RootState, AppDispatch } from '@/store/store';

export default function MoviePage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    upcomingMovies,
    topRatedMovies,
    nowPlayingMovies,
    featuredMovies,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.movies);

  const fetchMovies = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popular, upcoming, topRated, nowPlaying] = await Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
        getMovieNowPlaying(),
      ]);

      dispatch(setMovies(popular));
      dispatch(setUpcomingMovies(upcoming));
      dispatch(setTopRatedMovies(topRated));
      dispatch(setNowPlayingMovies(nowPlaying));
      dispatch(setFeaturedMovies(popular.slice(0, 8)));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('Failed to load movies.'));
      }

    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetAll());
    fetchMovies();
  }, [dispatch, fetchMovies]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
      {featuredMovies.length > 0 && <HeroBanner items={featuredMovies} />}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="my-10 text-4xl font-semibold text-center">
          Your Gateway to Movies
        </h1>
        <CategoryRow title="Popular Movies" items={movies} />
        <CategoryRow title="Upcoming Movies" items={upcomingMovies} />
        <CategoryRow title="Top Rated Movies" items={topRatedMovies} />
        <CategoryRow title="Now Playing" items={nowPlayingMovies} />
      </div>
    </>
  );
}
