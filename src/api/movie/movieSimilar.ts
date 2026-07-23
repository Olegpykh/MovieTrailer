import client from '../client';
import { Movie, ApiResponce } from '@/types/tmdb';

export const getSimilarMovies = async (
  id: string | number,
  page = 1
): Promise<Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>(
      `/movie/${id}/similar?page=${page}`
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
