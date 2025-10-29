// src/api/movie/search.js
import client from '../client';

const searchMovies = async (query, page = 1) => {
  const response = await client.get('/search/movie', {
    params: {
      query: encodeURIComponent(query.trim()),
      page,
    },
  });
  return {
    results: response.data.results || [],
    totalPages: response.data.total_pages || 1,
  };
};

export default searchMovies;
