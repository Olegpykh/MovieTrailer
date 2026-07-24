import client from '../client';
import { Genres } from '@/types/tmdb';

interface GenreListResponse {
  genres: Genres[];
}

export const getMovieGenres = async (): Promise<Genres[]> => {
  try {
    const { data } = await client.get<GenreListResponse>('/genre/movie/list');
    return data.genres ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return [];
  }
};

export const getTvGenres = async (): Promise<Genres[]> => {
  try {
    const { data } = await client.get<GenreListResponse>('/genre/tv/list');
    return data.genres ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return [];
  }
};
