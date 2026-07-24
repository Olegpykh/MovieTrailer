import client from '../client';
import { SeasonDetailsResponse } from '@/types/tmdb';

export const getTvSeasonDetails = async (
  tvId: string | number,
  seasonNumber: number
): Promise<SeasonDetailsResponse | null> => {
  try {
    const { data } = await client.get<SeasonDetailsResponse>(
      `/tv/${tvId}/season/${seasonNumber}`
    );
    return data ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return null;
  }
};
