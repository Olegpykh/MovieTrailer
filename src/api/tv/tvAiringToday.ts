import client from '../client';
import {TV,ApiResponce} from "types/tmdb"


export const getTvAiringToday = async ():Promise<TV[]> => {
  try {
    const { data } = await client.get<ApiResponce<TV>>('tv/airing_today');
    return data.results;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};


