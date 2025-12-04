import client from '../client';
import {Movie,ApiResponce} from "types/tmdb"

export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await client.get<ApiResponce<Movie>>('/movie/upcoming');
    return data.results;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
