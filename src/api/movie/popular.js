import client from '../client';

export const getPopularMovies = async (page = 1) => {
  const response = await client.get('/movie/popular', {
    params: { page },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages || 1,
  };
};
