import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorites/favoritesSlice';
import moviesReducer from './features/movies/movieSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
});

let prevFavorites = store.getState().favorites;






store.subscribe(() => {
  const favorites = store.getState().favorites;
  if (favorites !== prevFavorites) {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      prevFavorites = favorites;
    } catch (err) {
      console.error('Failed to save favorites', err);
    }
  }
});

export default store;
