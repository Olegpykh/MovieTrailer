import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch {
    return [];
  }
};

const initialState = loadFavoritesFromStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (movie && movie.id && !state.some((item) => item?.id === movie.id)) {
        state.push(movie);
      }
    },
    deleteFromFavorites: (state, action) => {
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


