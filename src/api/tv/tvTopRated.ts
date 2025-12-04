import client from '../client';
import {TV, ApiResponce} from "types/tmdb"

export const getTvTopRated = async ():Promise<TV[]> => {
  try {
    const { data } = await client.get<ApiResponce<TV>>('tv/top_rated');
    return data.results;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};
