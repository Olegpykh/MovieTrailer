import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroBanner from '../components/HeroBanner';
import CategoryRow from '../components/CategoryRow';
import {
  getPopularTVShows,
  getTvOnTheAir,
  getTvAiringToday,
  getTvTopRated
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

export default function TVPage() {
  const dispatch = useDispatch();
  const {
    popularTVShows,
    tvOnTheAir,
    tvAiringToday,
    topRatedTv,
    featuredTV,
    isLoading,
    error,
  } = useSelector((state) => state.movies);

  const fetchTV = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const [popular, onAir, airingToday,topRatedTv] = await Promise.all([
        getPopularTVShows(),
        getTvOnTheAir(),
        getTvAiringToday(),
        getTvTopRated()
      ]);

      dispatch(setPopularTVShows(popular));
      dispatch(setTvOnTheAir(onAir?.results ?? []));
      dispatch(setTvAiringToday(airingToday?.results ?? []));
      dispatch(setTopRatedTv(topRatedTv?.results ?? []))
      dispatch(setFeaturedTV(popular.slice(0, 5)));
    } catch (err) {
      dispatch(setError(err.message || 'Failed to load TV shows.'));
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
