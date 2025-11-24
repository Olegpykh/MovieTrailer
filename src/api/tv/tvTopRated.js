import client from '../client';

export const getTvTopRated = async () => {
  try {
    const { data } = await client.get('tv/top_rated');
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
