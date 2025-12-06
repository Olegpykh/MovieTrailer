import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTVShows,
  getTvOnTheAir,
} from '../api/index';
import {
  setMovies,
  setUpcomingMovies,
  setPopularTVShows,
  setTvOnTheAir,
  setFeaturedMovies,
  setLoading,
  setError,
  resetAll,
} from '../store/features/movies/movieSlice';
import CategoryRow from '../components/CategoryRow';
import { RootState, AppDispatch } from '@/store/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    movies,
    upcomingMovies,
    popularTVShows,
    tvOnTheAir,
    featuredMovies,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.movies);

  const fetchAll = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popularMovies, upcoming, tvShows, tvOnAir] = await Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getPopularTVShows(),
        getTvOnTheAir(),
      ]);

      dispatch(setMovies(popularMovies));
      dispatch(setUpcomingMovies(upcoming));
      dispatch(setPopularTVShows(tvShows));
      dispatch(setTvOnTheAir(tvOnAir));
      dispatch(setFeaturedMovies(popularMovies.slice(0, 8)));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load data.';
      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetAll());
    fetchAll();
  }, [dispatch, fetchAll]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
      {featuredMovies.length > 0 && <HeroBanner items={featuredMovies} />}

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="my-10 text-4xl font-semibold text-center">
          Discover Your Next Favorite
        </h1>

        <CategoryRow title="Popular Movies" items={movies} />
        <CategoryRow title="Upcoming Movies" items={upcomingMovies} />
        <CategoryRow title="Popular TV Shows" items={popularTVShows} />
        <CategoryRow title="On The Air" items={tvOnTheAir} />
      </div>
    </>
  );
}
