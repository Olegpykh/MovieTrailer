import client from '../client';
import { TV, ApiResponce } from '@/types/tmdb';

export const getSimilarTv = async (
  id: string | number,
  page = 1
): Promise<TV[]> => {
  try {
    const { data } = await client.get<ApiResponce<TV>>(
      `/tv/${id}/similar?page=${page}`
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
