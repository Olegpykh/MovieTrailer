import client from '../client';
import { Movie, ApiResponce } from '@/types/tmdb';

export const getPopularMovies = async ():Promise <Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>('/movie/popular');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
