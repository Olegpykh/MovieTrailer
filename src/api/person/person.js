import client from '../client';

const fetchPerson = async (id, details = '') => {
  try {
    const url = details ? `person/${id}/${details}` : `person/${id}`;
    const response = await client.get(url);
    return response.data || {};
  } catch (err) {
    console.error(err.message || 'Failed to fetch');
    return {};
  }
};

export const getPersonCombinedCredits = (id) =>
  fetchPerson(id, 'combined_credits');
export const getPerson = (id) => fetchPerson(id);


