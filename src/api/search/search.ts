import client from '../client';
import { SearchResult } from '@/types/tmdb';

export interface SearchResponse {
  results: SearchResult[];
  totalPages: number;
}

interface SearchApiData {
  results: SearchResult[] | null;
  total_pages: number | null;
}

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<SearchResponse> => {
  try {
    const response = await client.get<SearchApiData>('/search/multi', {
      params: {
        query: query.trim(),
        page,
      },
    });

    return {
      results: response.data.results ?? [],
      totalPages: response.data.total_pages ?? 1,
    };
  } catch (error) {
    console.error('Search request failed:', error);
    return {
      results: [],
      totalPages: 1,
    };
  }
};


