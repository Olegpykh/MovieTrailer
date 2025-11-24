import client from '../client';

export const getUpcomingMovies = async () => {
  try {
    const { data } = await client.get('/movie/upcoming');
    return data.results;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
