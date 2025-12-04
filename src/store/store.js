// import { configureStore } from '@reduxjs/toolkit';
// import favoritesReducer from './features/favorites/favoritesSlice';
// import moviesReducer from './features/movies/movieSlice';

// const store = configureStore({
//   reducer: {
//     favorites: favoritesReducer,
//     movies: moviesReducer,
//   },
// });
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = ReturnType<typeof store.dispatch>

// let prevFavorites:RootState["favorites"] = store.getState().favorites;






// store.subscribe(() => {
//   const favorites:RootState["favorites"] = store.getState().favorites;
//   if (favorites !== prevFavorites) {
//     try {
//       localStorage.setItem('favorites', JSON.stringify(favorites));
//       prevFavorites = favorites;
//     } catch (err) {
//       console.error('Failed to save favorites', err);
//     }
//   }
// });

// export default store;





import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './features/favorites/favoritesSlice';
import moviesReducer from './features/movies/movieSlice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
  },
});

// сохраняем предыдущее состояние favorites
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


