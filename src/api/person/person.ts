import client from '../client';
import { Person, PersonCombinedCredits } from '@/types/tmdb';

const emptyCredits: PersonCombinedCredits = {
  id: 0,
  cast: [],
};

const emptyPerson: Person = {
  id: 0,
  name: '',
  biography: '',
  birthday: null,
  deathday: null,
  place_of_birth: '',
  profile_path: null,
  known_for_department: '',
  popularity: 0,
};

const fetchPerson = async <T>(id: string, details: string = ''): Promise<T> => {
  try {
    const url = details ? `person/${id}/${details}` : `person/${id}`;
    const response = await client.get<T>(url);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error('Failed to fetch');
    }

    if (details === 'combined_credits') {
      return { ...emptyCredits, id: parseInt(id) || 0 } as T;
    }
    return { ...emptyPerson, id: parseInt(id) || 0 } as T;
  }
};

export const getPersonCombinedCredits = (
  id: string
): Promise<PersonCombinedCredits> =>
  fetchPerson<PersonCombinedCredits>(id, 'combined_credits');

export const getPerson = (id: string): Promise<Person> =>
  fetchPerson<Person>(id);
