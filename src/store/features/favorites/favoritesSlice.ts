import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Movie, TV } from '@/types/tmdb';

const loadFavoritesFromStorage = (): (Movie | TV)[] => {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]') as (
      | Movie
      | TV
    )[];
  } catch {
    return [];
  }
};

const initialState: (Movie | TV)[] = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie | TV>) => {
      const movie = action.payload;
      if (movie && movie.id && !state.some((item) => item?.id === movie.id)) {
        state.push(movie);
      }
    },
    deleteFromFavorites: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload?.id;
      if (id) {
        return state.filter((movie) => movie?.id !== id);
      }
      return state;
    },
  },
});

export const { addToFavorites, deleteFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

