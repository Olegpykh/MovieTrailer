import client from '../client';
import { VideosResponse, CreditsResponse } from '@/types/tmdb';

const fetchCreditsAndVideos = async <T>(
  type: 'movie' | 'tv',
  id: string,
  resource: string
): Promise<T> => {
  try {
    const response = await client.get<T>(`${type}/${id}/${resource}`);
    return response.data;
  } catch (err) {
    console.error((err as Error).message || 'Data failed to fetch');

    if (resource === 'credits') {
      return { id: parseInt(id) || 0, cast: [] } as T;
    }
    return {
      id: parseInt(id) || 0,
      results: [],
    } as T;
  }
};

export const getCreditsFromTV = (id: string) =>
  fetchCreditsAndVideos<CreditsResponse>('tv', id, 'credits');
export const getCreditsFromMovie = (id: string) =>
  fetchCreditsAndVideos<CreditsResponse>('movie', id, 'credits');

export const getMovieVideos = (id: string) =>
  fetchCreditsAndVideos<VideosResponse>('movie', id, 'videos');
export const getTvVideos = (id: string) =>
  fetchCreditsAndVideos<VideosResponse>('tv', id, 'videos');

