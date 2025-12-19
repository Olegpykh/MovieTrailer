import client from '../client';
import { Movie, ApiResponce } from '@/types/tmdb';

export const getTopRatedMovies = async (page = 1): Promise<Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>(
      `/movie/top_rated?page=${page}`
    );
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
