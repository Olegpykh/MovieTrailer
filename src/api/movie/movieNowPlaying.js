import client from '../client';

export const getMovieNowPlaying = async () => {
  try {
    const { data } = await client.get('/movie/now_playing');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};


