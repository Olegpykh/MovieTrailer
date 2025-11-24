import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  searchResults: [],

  movies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  nowPlayingMovies: [],

  popularTVShows: [],
  tvOnTheAir: [],
  tvAiringToday: [],
  topRatedTv: [],

  featuredMovies: [],
  featuredTV: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // search
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    // movies
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setFeaturedMovies: (state, action) => {
      state.featuredMovies = action.payload;
    },

    // tv shows
    setPopularTVShows: (state, action) => {
      state.popularTVShows = action.payload;
    },
    setTvOnTheAir: (state, action) => {
      state.tvOnTheAir = action.payload;
    },
    setTvAiringToday: (state, action) => {
      state.tvAiringToday = action.payload;
    },
    setFeaturedTV: (state, action) => {
      state.featuredTV = action.payload;
    },
    setTopRatedTv: (state, action) => {
      state.topRatedTv = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    resetAll: (state) => {
      state.searchResults = [];
      state.movies = [];
      state.upcomingMovies = [];
      state.topRatedMovies = [];
      state.nowPlayingMovies = [];
      state.popularTVShows = [];
      state.tvOnTheAir = [];
      state.tvAiringToday = [];
      state.featuredMovies = [];
      state.featuredTV = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setFeaturedMovies,
  setPopularTVShows,
  setTvOnTheAir,
  setTvAiringToday,
  setTopRatedTv,
  setFeaturedTV,
  setLoading,
  setError,
  resetAll,
} = moviesSlice.actions;

export default moviesSlice.reducer;
