
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TV, TvDetails } from '@/types/tmdb';

interface TvState {
  popularTVShows: TV[];
  tvOnTheAir: TV[];
  tvAiringToday: TV[];
  topRatedTv: TV[];

  popularTVShowsPage: number;
  tvOnTheAirPage: number;
  tvAiringTodayPage: number;
  topRatedTvPage: number;

  featuredTV: TV[];

  tvDetails: TvDetails | null;
}

const initialState: TvState = {
  popularTVShows: [],
  tvOnTheAir: [],
  tvAiringToday: [],
  topRatedTv: [],

  popularTVShowsPage: 1,
  tvOnTheAirPage: 1,
  tvAiringTodayPage: 1,
  topRatedTvPage: 1,

  featuredTV: [],

  tvDetails: null,
};

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    setPopularTVShows: (state, action: PayloadAction<TV[]>) => {
      state.popularTVShows = action.payload;
    },
    setTvOnTheAir: (state, action: PayloadAction<TV[]>) => {
      state.tvOnTheAir = action.payload;
    },
    setTvAiringToday: (state, action: PayloadAction<TV[]>) => {
      state.tvAiringToday = action.payload;
    },
    setTopRatedTv: (state, action: PayloadAction<TV[]>) => {
      state.topRatedTv = action.payload;
    },
    setFeaturedTV: (state, action: PayloadAction<TV[]>) => {
      state.featuredTV = action.payload;
    },
    setTvDetails: (state, action: PayloadAction<TvDetails | null>) => {
      state.tvDetails = action.payload;
    },

    appendPopularTvShows: (state, action: PayloadAction<TV[]>) => {
      state.popularTVShows = [...state.popularTVShows, ...action.payload];
    },
    appendTvOnTheAir: (state, action: PayloadAction<TV[]>) => {
      state.tvOnTheAir = [...state.tvOnTheAir, ...action.payload];
    },
    appendTvAiringToday: (state, action: PayloadAction<TV[]>) => {
      state.tvAiringToday = [...state.tvAiringToday, ...action.payload];
    },
    appendTopRatedTv: (state, action: PayloadAction<TV[]>) => {
      state.topRatedTv = [...state.topRatedTv, ...action.payload];
    },

    incrementPopularTVShowsPage: (state) => {
      state.popularTVShowsPage += 1;
    },
    incrementTvOnTheAirPage: (state) => {
      state.tvOnTheAirPage += 1;
    },
    incrementTvAiringTodayPage: (state) => {
      state.tvAiringTodayPage += 1;
    },
    incrementTopRatedTvPage: (state) => {
      state.topRatedTvPage += 1;
    },
    resetTvState: (state) => {
      state.popularTVShows = [];
      state.tvOnTheAir = [];
      state.tvAiringToday = [];
      state.topRatedTv = [];
      state.featuredTV = [];
      state.tvDetails = null;
      state.popularTVShowsPage = 1;
      state.tvOnTheAirPage = 1;
      state.tvAiringTodayPage = 1;
      state.topRatedTvPage = 1;
    },
  },
});

export const {
  setPopularTVShows,
  setTvOnTheAir,
  setTvAiringToday,
  setTopRatedTv,
  setFeaturedTV,
  setTvDetails,

  appendPopularTvShows,
  appendTvOnTheAir,
  appendTvAiringToday,
  appendTopRatedTv,

  incrementPopularTVShowsPage,
  incrementTvOnTheAirPage,
  incrementTvAiringTodayPage,
  incrementTopRatedTvPage,
  resetTvState
} = tvSlice.actions;

export default tvSlice.reducer;
