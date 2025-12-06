import client from '../client';
import { Movie, ApiResponce } from 'types/tmdb';

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>('/movie/upcoming');
    return data.results;
  } catch (err) {
    if (err instanceof Error) {
      err.message;
    } else {
      console.error('Data failed to fetch');
    }
    return [];
  }
};
