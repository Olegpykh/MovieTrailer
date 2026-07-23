import client from '../client';
import { SearchResult } from '@/types/tmdb';

export type TimeWindow = 'day' | 'week';

export interface TrendingResponse {
  results: SearchResult[];
  totalPages: number;
}

interface TrendingApiData {
  results: SearchResult[] | null;
  total_pages: number | null;
}

export const getTrending = async (
  timeWindow: TimeWindow = 'day',
  page: number = 1
): Promise<TrendingResponse> => {
  try {
    const response = await client.get<TrendingApiData>(
      `/trending/all/${timeWindow}`,
      {
        params: { page },
      }
    );

    return {
      results: response.data.results ?? [],
      totalPages: response.data.total_pages ?? 1,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Trending request failed:');
    }
    return {
      results: [],
      totalPages: 1,
    };
  }
};
