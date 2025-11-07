import client from '../client';

export const getPopularTVShows = async (page = 1) => {
  const response = await client.get('/tv/popular', {
    params: { page },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages || 1,
  };
};

