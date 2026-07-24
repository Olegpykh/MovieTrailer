import client from '../client';
import { ReviewsResponse, Review } from '@/types/tmdb';

const fetchReviews = async (
  mediaType: 'movie' | 'tv',
  id: string | number
): Promise<Review[]> => {
  try {
    const { data } = await client.get<ReviewsResponse>(
      `/${mediaType}/${id}/reviews`
    );
    return data.results ?? [];
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Data failed to fetch');
    }
    return [];
  }
};

export const getMovieReviews = (id: string | number): Promise<Review[]> =>
  fetchReviews('movie', id);

export const getTvReviews = (id: string | number): Promise<Review[]> =>
  fetchReviews('tv', id);
