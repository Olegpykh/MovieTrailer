import client from '../client';

 export const getUpcomingMovies = async (page = 1) => {
  const response = await client.get('/movie/upcoming', { params: { page } });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages || 1,
  };
};

