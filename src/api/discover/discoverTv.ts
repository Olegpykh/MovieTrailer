import client from '../client';
import { TV, ApiResponce } from '@/types/tmdb';
import { SortOption } from './discoverMovie';

const SORT_MAP: Record<SortOption, string> = {
  popular: 'popularity.desc',
  top_rated: 'vote_average.desc',
  newest: 'first_air_date.desc',
};

interface DiscoverTvParams {
  genreId?: number | null;
  sort?: SortOption;
  page?: number;
}

export interface DiscoverResponse<T> {
  results: T[];
  totalPages: number;
}

export const discoverTv = async ({
  genreId,
  sort = 'popular',
  page = 1,
}: DiscoverTvParams): Promise<DiscoverResponse<TV>> => {
  try {
    const { data } = await client.get<ApiResponce<TV>>('/discover/tv', {
      params: {
        with_genres: genreId || undefined,
        sort_by: SORT_MAP[sort],
        ...(sort === 'top_rated' ? { 'vote_count.gte': 200 } : {}),
        page,
      },
    });

    return {
      results: data.results ?? [],
      totalPages: data.total_pages ?? 1,
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return { results: [], totalPages: 1 };
  }
};
