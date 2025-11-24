import client from '../client';

export const getTvAiringToday = async () => {
  try {
    const { data } = await client.get('tv/airing_today');
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};


