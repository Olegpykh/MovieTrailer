import client from '../client';

export const getTopRatedMovies = async (page = 1) => {
  const response = await client.get('/movie/top_rated', {
    params: { page },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages || 1,
  };
};

