import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorites/favoritesSlice';
import moviesReducer from './features/movies/movieSlice';
import tvReducer from './features/tv/tvSlice';
import uiReducer from './features/ui/uiSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    tv: tvReducer,
    ui: uiReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let prevFavorites: RootState['favorites'] = store.getState().favorites;

store.subscribe(() => {
  const favorites: RootState['favorites'] = store.getState().favorites;
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
