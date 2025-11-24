import client from '../client';

export const searchMovies = async (query, page = 1) => {
  const response = await client.get('/search/multi', {
    params: {
      query: query.trim(),
      page,
    },
  });
  return {
    results: response.data.results || [],
    totalPages: response.data.total_pages || 1,
  };
};
