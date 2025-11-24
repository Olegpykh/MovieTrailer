import client from '../client';

export const getTopRatedMovies = async () => {
  try {
    const { data } = await client.get('/movie/top_rated');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
