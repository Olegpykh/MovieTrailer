import client from '../client';
import { Movie, ApiResponce } from '@/types/tmdb';

export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>('/movie/popular');
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
