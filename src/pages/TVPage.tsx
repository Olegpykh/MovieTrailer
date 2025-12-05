import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import {
  getPopularTVShows,
  getTvOnTheAir,
  getTvAiringToday,
  getTvTopRated,
} from '../api/index';
import {
  setPopularTVShows,
  setTvOnTheAir,
  setTvAiringToday,
  setFeaturedTV,
  setLoading,
  setError,
  resetAll,
  setTopRatedTv,
} from '../store/features/movies/movieSlice';
import { RootState, AppDispatch } from '@/store/store';
import { Movie, TV } from 'types/tmdb';

export default function TVPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    popularTVShows,
    tvOnTheAir,
    tvAiringToday,
    topRatedTv,
    featuredTV,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.movies);

  const fetchTV = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popular, onAir, airingToday, topRatedTv] = await Promise.all<TV[]>([
        getPopularTVShows(),
        getTvOnTheAir(),
        getTvAiringToday(),
        getTvTopRated(),
      ]);

      dispatch(setPopularTVShows(popular ?? []));
      dispatch(setTvOnTheAir(onAir ?? []));
      dispatch(setTvAiringToday(airingToday ?? []));
      dispatch(setTopRatedTv(topRatedTv ?? []));
      dispatch(setFeaturedTV(popular.slice(0, 8)));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setError(err.message));
      } else {
        dispatch(setError('Failed to load TV shows.'));
      }

      // dispatch(setError(err.message || 'Failed to load TV shows.'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetAll());
    fetchTV();
  }, [dispatch, fetchTV]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <>
      {featuredTV.length > 0 && <HeroBanner items={featuredTV} />}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="my-10 text-4xl font-semibold text-center">
          Stream the Stories You Love
        </h1>
        <CategoryRow title="Popular TV Shows" items={popularTVShows} />
        <CategoryRow title="On The Air" items={tvOnTheAir} />
        <CategoryRow title="Airing Today" items={tvAiringToday} />
        <CategoryRow title="Top Rated " items={topRatedTv} />
      </div>
    </>
  );
}
