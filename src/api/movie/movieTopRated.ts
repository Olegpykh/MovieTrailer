import client from '../client';
import { Movie,ApiResponce } from '@/types/tmdb';

export const getTopRatedMovies = async ():Promise<Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>('/movie/top_rated');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
