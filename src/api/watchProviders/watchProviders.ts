import client from '../client';
import { WatchProvidersResponse, WatchProviderRegion } from '@/types/tmdb';

const DEFAULT_REGION = 'US';

const fetchProviders = async (
  mediaType: 'movie' | 'tv',
  id: string | number,
  region: string = DEFAULT_REGION
): Promise<WatchProviderRegion | null> => {
  try {
    const { data } = await client.get<WatchProvidersResponse>(
      `/${mediaType}/${id}/watch/providers`
    );
    return data.results?.[region] ?? null;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return null;
  }
};

export const getMovieWatchProviders = (
  id: string | number,
  region?: string
): Promise<WatchProviderRegion | null> => fetchProviders('movie', id, region);

export const getTvWatchProviders = (
  id: string | number,
  region?: string
): Promise<WatchProviderRegion | null> => fetchProviders('tv', id, region);
