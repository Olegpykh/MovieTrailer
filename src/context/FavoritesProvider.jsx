import { useEffect, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === movie.id)) {
        return [...prev, { ...movie }];
      }
      return prev;
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((film) => film.id !== movie.id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
