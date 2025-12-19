import { AppDispatch, RootState } from '@/store/store';

import {
  apppendPopularTvShows,
  apppendTopRatedTv,
  apppendTvAiringToday,
  apppendTvOnTheAir,
  incrementPopularTVShowsPage,
  incrementTopRatedTvPage,
  incrementTvAiringTodayPage,
  incrementTvOnTheAirPage,
} from '@/store/features/movies/movieSlice';

import {
  getPopularTVShows,
  getTvTopRated,
  getTvAiringToday,
  getTvOnTheAir,
} from '../index';

export const loadMorePopularTVShows =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.popularTVShowsPage;
    const newItems = await getPopularTVShows(page);

    dispatch(apppendPopularTvShows(newItems));
    dispatch(incrementPopularTVShowsPage());
  };

export const loadMoreTopRatedTV =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.topRatedTvPage;
    const newItems = await getTvTopRated(page);

    dispatch(apppendTopRatedTv(newItems));
    dispatch(incrementTopRatedTvPage());
  };

export const loadMoreTvAiringToday =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.tvAiringTodayPage;
    const newItems = await getTvAiringToday(page);

    dispatch(apppendTvAiringToday(newItems));
    dispatch(incrementTvAiringTodayPage());
  };

export const loadMoreTvOnTheAir =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.tvOnTheAirPage;
    const newItems = await getTvOnTheAir(page);

    dispatch(apppendTvOnTheAir(newItems));
    dispatch(incrementTvOnTheAirPage());
  };
