import { AppDispatch, RootState } from '@/store/store';

import {
  appendPopularTvShows,
  appendTopRatedTv,
  appendTvAiringToday,
  appendTvOnTheAir,
  incrementPopularTVShowsPage,
  incrementTopRatedTvPage,
  incrementTvAiringTodayPage,
  incrementTvOnTheAirPage,
} from '@/store/features/tv/tvSlice';

import {
  getPopularTVShows,
  getTvTopRated,
  getTvAiringToday,
  getTvOnTheAir,
} from '../index';

export const loadMorePopularTVShows =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().tv.popularTVShowsPage;
    const newItems = await getPopularTVShows(page);

    dispatch(appendPopularTvShows(newItems));
    dispatch(incrementPopularTVShowsPage());
  };

export const loadMoreTopRatedTV =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().tv.topRatedTvPage;
    const newItems = await getTvTopRated(page);

    dispatch(appendTopRatedTv(newItems));
    dispatch(incrementTopRatedTvPage());
  };

export const loadMoreTvAiringToday =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().tv.tvAiringTodayPage;
    const newItems = await getTvAiringToday(page);

    dispatch(appendTvAiringToday(newItems));
    dispatch(incrementTvAiringTodayPage());
  };

export const loadMoreTvOnTheAir =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().tv.tvOnTheAirPage;
    const newItems = await getTvOnTheAir(page);

    dispatch(appendTvOnTheAir(newItems));
    dispatch(incrementTvOnTheAirPage());
  };
