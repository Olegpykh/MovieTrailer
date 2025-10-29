import client from '../client';

const getPopularTVShows = async (page = 1) => {
  const response = await client.get('/tv/popular', {
    params: { page },
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
};

export default getPopularTVShows;
