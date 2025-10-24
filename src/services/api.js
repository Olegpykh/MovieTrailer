const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    const data = await response.json();
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date || 'N/A',
      poster_path: movie.poster_path || null,
    }));
  } catch (error) {
    throw new Error('Error fetching popular movies: ' + error.message);
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    const data = await response.json();
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date || 'N/A',
      poster_path: movie.poster_path || null,
    }));
  } catch (error) {
    throw new Error('Error searching movies: ' + error.message);
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch top ratede movies');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};
