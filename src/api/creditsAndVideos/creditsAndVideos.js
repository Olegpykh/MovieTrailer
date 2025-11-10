import client from '../client';

const fetchCreditsAndVideos = async (type, id, resource) => {
  try {
    const response = await client.get(`${type}/${id}/${resource}`);
    return response.data.results ||  response.data || [];
  } catch (err) {
    console.error(err.message || 'Data failed to fetch');
    return [];
  }
};

export const getCreditsFromTV = (id) =>
  fetchCreditsAndVideos('tv', id, 'credits');
export const getCreditsFromMovie = (id) =>
  fetchCreditsAndVideos('movie', id, 'credits');

export const getMovieVideos = (id) =>
  fetchCreditsAndVideos('movie', id, 'videos');
export const getTvVideos = (id) => fetchCreditsAndVideos('tv', id, 'videos');

// https://api.themoviedb.org/3/tv/{series_id}/credits

// https://api.themoviedb.org/3/movie/{movie_id}/credits


// response.data.cast ||
