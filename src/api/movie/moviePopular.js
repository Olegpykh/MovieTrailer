import client from '../client';

export const getPopularMovies = async () => {
  try {
    const { data } = await client.get('/movie/popular');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
