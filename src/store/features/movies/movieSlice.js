import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  movies: [],
  featuredMovies: [],
  page: 1,
  totalPages: null,
  isLoading: true,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setMovies: (state, action) => {
      const { results, totalPages, page, reset = false } = action.payload;
      if (reset || page === 1) {
        state.movies = results;
      } else {
        const existingIds = new Set(state.movies.map((m) => m.id));
        const newMovies = results.filter((m) => !existingIds.has(m.id));
        state.movies = [...state.movies, ...newMovies];
      }
      state.totalPages = totalPages ?? 1;
      state.page = page;
    },
    setFeaturedMovies: (state, action) => {
      state.featuredMovies = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    resetPage: (state) => {
      state.page = 1;
      state.movies = [];
      state.featuredMovies = [];
      state.error = null;
      state.isLoading = true;
    },
    loadMore: (state) => {
      if (state.page < state.totalPages) {
        state.page += 1;
      }
    },
  },
});

export const {
  setSearchQuery,
  setMovies,
  setFeaturedMovies,
  setLoading,
  setError,
  resetPage,
  loadMore,
} = moviesSlice.actions;

export default moviesSlice.reducer;
