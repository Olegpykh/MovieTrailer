import client from '../client';
import { TV, ApiResponce } from 'types/tmdb';

export const getPopularTVShows = async (): Promise<TV[]> => {
  try {
    const { data } = await client.get<ApiResponce<TV>>('/tv/popular');
    return data.results;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
