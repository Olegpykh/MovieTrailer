import client from '../client';

export const getTvOnTheAir = async () => {
  try {
    const { data } = await client.get('tv/on_the_air');
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};


