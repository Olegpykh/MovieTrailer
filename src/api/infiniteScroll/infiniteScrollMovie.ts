import { AppDispatch, RootState } from '@/store/store';

import {
  appendNowPlayingMovies,
  appendPopularMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,
  incrementNowPlayingMoviesPage,
  incrementPopularMoviesPage,
  incrementTopRatedMoviesPage,
  incrementUpcomingMoviesPage,
} from '@/store/features/movies/movieSlice';

import {
  getPopularMovies,
  getMovieNowPlaying,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../index';

export const loadMorePopularMovies =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.popularMoviesPage;
    const newMovies = await getPopularMovies(page);

    dispatch(appendPopularMovies(newMovies));
    dispatch(incrementPopularMoviesPage());
  };

export const loadMoreUpcomingMovies =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.upcomingMoviesPage;
    const newMovies = await getUpcomingMovies(page);

    dispatch(appendUpcomingMovies(newMovies));
    dispatch(incrementUpcomingMoviesPage());
  };

export const loadMoreNowPlaingMovies =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.nowPlayingMoviesPage;
    const newMovies = await getMovieNowPlaying(page);

    dispatch(appendNowPlayingMovies(newMovies));
    dispatch(incrementNowPlayingMoviesPage());
  };

export const loadMoreTopRatedMovies =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().movies.topRatedMoviesPage;
    const newMovies = await getTopRatedMovies(page);

    dispatch(appendTopRatedMovies(newMovies));
    dispatch(incrementTopRatedMoviesPage());
  };
