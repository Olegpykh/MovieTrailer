import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Movie,
  MovieDetails,
  VideosResponse,
  CreditsResponse,
  SearchResult,
  VideoItem,
  CastMember,
} from '@/types/tmdb';

interface MoviesState {
  searchQuery: string;
  searchResults: SearchResult[];

  movies: Movie[];
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  nowPlayingMovies: Movie[];

  popularMoviesPage: number;
  upcomingMoviesPage: number;
  topRatedMoviesPage: number;
  nowPlayingMoviesPage: number;

  featuredMovies: Movie[];

  movieDetails: MovieDetails | null;

  videos: VideoItem[];
  cast: CastMember[];
}

const initialState: MoviesState = {
  searchQuery: '',
  searchResults: [],

  movies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  nowPlayingMovies: [],

  popularMoviesPage: 1,
  upcomingMoviesPage: 1,
  topRatedMoviesPage: 1,
  nowPlayingMoviesPage: 1,

  featuredMovies: [],

  movieDetails: null,

  videos: [],
  cast: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    setUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovies = action.payload;
    },
    setNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    setFeaturedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.featuredMovies = action.payload;
    },

    appendPopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = [...state.movies, ...action.payload];
    },
    appendUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upcomingMovies = [...state.upcomingMovies, ...action.payload];
    },
    appendTopRatedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovies = [...state.topRatedMovies, ...action.payload];
    },
    appendNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = [...state.nowPlayingMovies, ...action.payload];
    },

    incrementPopularMoviesPage: (state) => {
      state.popularMoviesPage += 1;
    },

    incrementUpcomingMoviesPage: (state) => {
      state.upcomingMoviesPage += 1;
    },

    incrementTopRatedMoviesPage: (state) => {
      state.topRatedMoviesPage += 1;
    },
    incrementNowPlayingMoviesPage: (state) => {
      state.nowPlayingMoviesPage += 1;
    },

    setMovieDetails: (state, action: PayloadAction<MovieDetails | null>) => {
      state.movieDetails = action.payload;
    },

    setVideos: (state, action: PayloadAction<VideosResponse['results']>) => {
      state.videos = action.payload;
    },
    setCast: (state, action: PayloadAction<CreditsResponse['cast']>) => {
      state.cast = action.payload;
    },

    resetMovieState: (state) => {
      state.movies = [];
      state.upcomingMovies = [];
      state.topRatedMovies = [];
      state.nowPlayingMovies = [];
      state.featuredMovies = [];
      state.movieDetails = null;
      state.popularMoviesPage = 1;
      state.upcomingMoviesPage = 1;
      state.topRatedMoviesPage = 1;
      state.nowPlayingMoviesPage = 1;
    },
  },
});

export const {
  setMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setFeaturedMovies,
  setMovieDetails,

  setVideos,
  setCast,

  resetMovieState,

  appendPopularMovies,
  appendNowPlayingMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,

  incrementNowPlayingMoviesPage,
  incrementPopularMoviesPage,
  incrementTopRatedMoviesPage,
  incrementUpcomingMoviesPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
