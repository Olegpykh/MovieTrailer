import client from '../client';

export const getPopularTVShows = async () => {
  try {
    const { data } = await client.get('/tv/popular');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
