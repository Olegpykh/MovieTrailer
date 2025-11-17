import client from '../client';

const fetchMovieAndTvDetails = async (type, id) => {
  try {
    const res = await client.get(`/${type}/${id}`);
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getTvDetails = (id) => fetchMovieAndTvDetails('tv', id);

export const getMovieDetails = (id) => fetchMovieAndTvDetails('movie', id);
