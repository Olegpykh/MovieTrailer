// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const BASE_URL = 'https://api.themoviedb.org/3';

// const transformMovie = (movie) => ({
//   id: movie.id,
//   title: movie.title,
//   release_date: movie.release_date || 'N/A',
//   poster_path: movie.poster_path || null,
//   overview: movie.overview || 'No description available',
//   vote_average: movie.vote_average || 0,
// });

// export const getPopularMovies = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/popular?api_key=${API_KEY}`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch popular movies');
//     }
//     const data = await response.json();
//     const results = data.results || [];
//     return results.map(transformMovie);
//   } catch (error) {
//     throw new Error('Error fetching popular movies: ' + error.message);
//   }
// };

// export const searchMovies = async (query) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
//         query
//       )}`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to search movies');
//     }
//     const data = await response.json();
//     const results = data.results || [];
//     return results.map(transformMovie);
//   } catch (error) {
//     throw new Error('Error searching movies: ' + error.message);
//   }
// };

// export const getTopRatedMovies = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch top rated movies');
//     }
//     const data = await response.json();
//     const results = data.results || [];
//     return results.map(transformMovie);
//   } catch (error) {
//     throw new Error('Error fetching top rated movies: ' + error.message);
//   }
// };

// export const getUpcomingMovies = async () => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
//     );
//     if (!response.ok) {
//       throw new Error('Failed to fetch upcoming movies');
//     }
//     const data = await response.json();
//     const results = data.results || [];
//     return results.map(transformMovie);
//   } catch (error) {
//     throw new Error('Error fetching upcoming movies: ' + error.message);
//   }
// };
