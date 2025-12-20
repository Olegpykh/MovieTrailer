import client from '../client';
import { MovieDetails, TvDetails } from '@/types/tmdb';

type MediaType = 'tv' | 'movie';

const fetchMovieAndTvDetails = async <T>(
  type: MediaType,
  id: number
): Promise<T | undefined> => {
  try {
    const res = await client.get<T>(`/${type}/${id}`);
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return undefined;
  }
};

export const getTvDetails = (id: number) =>
  fetchMovieAndTvDetails<TvDetails>('tv', id);

export const getMovieDetails = (id: number) =>
  fetchMovieAndTvDetails<MovieDetails>('movie', id);



