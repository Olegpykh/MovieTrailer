import client from '../client';
import { TV, ApiResponce } from 'types/tmdb';

export const getTvOnTheAir = async (): Promise<TV[]> => {
  try {
    const { data } = await client.get<ApiResponce<TV>>('tv/on_the_air');
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error');
    }
    return [];
  }
};
