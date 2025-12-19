import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Movie,
  TV,
  MovieDetails,
  TvDetails,
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

  popularTVShows: TV[];
  tvOnTheAir: TV[];
  tvAiringToday: TV[];
  topRatedTv: TV[];

  popularTVShowsPage: number;
  tvOnTheAirPage: number;
  tvAiringTodayPage: number;
  topRatedTvPage: number;

  featuredMovies: Movie[];
  featuredTV: TV[];

  movieDetails: MovieDetails | null;
  tvDetails: TvDetails | null;
  videos: VideoItem[];
  cast: CastMember[];

  isLoading: boolean;
  error: string | null;
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

  popularTVShows: [],
  tvOnTheAir: [],
  tvAiringToday: [],
  topRatedTv: [],

  popularTVShowsPage: 1,
  tvOnTheAirPage: 1,
  tvAiringTodayPage: 1,
  topRatedTvPage: 1,

  featuredMovies: [],
  featuredTV: [],

  movieDetails: null,
  tvDetails: null,
  videos: [],
  cast: [],

  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.searchResults = action.payload;
    },

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

    setPopularTVShows: (state, action: PayloadAction<TV[]>) => {
      state.popularTVShows = action.payload;
    },
    setTvOnTheAir: (state, action: PayloadAction<TV[]>) => {
      state.tvOnTheAir = action.payload;
    },
    setTvAiringToday: (state, action: PayloadAction<TV[]>) => {
      state.tvAiringToday = action.payload;
    },
    setFeaturedTV: (state, action: PayloadAction<TV[]>) => {
      state.featuredTV = action.payload;
    },
    setTopRatedTv: (state, action: PayloadAction<TV[]>) => {
      state.topRatedTv = action.payload;
    },

    apppendPopularTvShows: (state, action: PayloadAction<TV[]>) => {
      state.popularTVShows = [...state.popularTVShows, ...action.payload];
    },
    apppendTvOnTheAir: (state, action: PayloadAction<TV[]>) => {
      state.tvOnTheAir = [...state.tvOnTheAir, ...action.payload];
    },
    apppendTvAiringToday: (state, action: PayloadAction<TV[]>) => {
      state.tvAiringToday = [...state.tvAiringToday, ...action.payload];
    },
    apppendTopRatedTv: (state, action: PayloadAction<TV[]>) => {
      state.topRatedTv = [...state.topRatedTv, ...action.payload];
    },

    incrementPopularTVShowsPage: (state) => {
      state.popularTVShowsPage += 1;
    },
    incrementTvOnTheAirPage: (state) => {
      state.tvOnTheAirPage += 1;
    },
    incrementTopRatedTvPage: (state) => {
      state.topRatedTvPage += 1;
    },

    incrementTvAiringTodayPage: (state) => {
      state.tvAiringTodayPage += 1;
    },

    setMovieDetails: (state, action: PayloadAction<MovieDetails | null>) => {
      state.movieDetails = action.payload;
    },
    setTvDetails: (state, action: PayloadAction<TvDetails | null>) => {
      state.tvDetails = action.payload;
    },
    setVideos: (state, action: PayloadAction<VideosResponse['results']>) => {
      state.videos = action.payload;
    },
    setCast: (state, action: PayloadAction<CreditsResponse['cast']>) => {
      state.cast = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetAll: (state) => {
      state.searchResults = [];
      state.movies = [];
      state.upcomingMovies = [];
      state.topRatedMovies = [];
      state.nowPlayingMovies = [];
      state.popularTVShows = [];
      state.tvOnTheAir = [];
      state.tvAiringToday = [];
      state.featuredMovies = [];
      state.featuredTV = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setMovies,
  setUpcomingMovies,
  setTopRatedMovies,
  setNowPlayingMovies,
  setFeaturedMovies,
  setPopularTVShows,
  setTvOnTheAir,
  setTvAiringToday,
  setTopRatedTv,
  setFeaturedTV,
  setMovieDetails,
  setTvDetails,
  setVideos,
  setCast,
  setLoading,
  setError,
  resetAll,
  appendPopularMovies,
  appendNowPlayingMovies,
  appendTopRatedMovies,
  appendUpcomingMovies,
  incrementNowPlayingMoviesPage,
  incrementPopularMoviesPage,
  incrementTopRatedMoviesPage,
  incrementUpcomingMoviesPage,
  apppendPopularTvShows,
  apppendTopRatedTv,
  apppendTvAiringToday,
  apppendTvOnTheAir,
  incrementPopularTVShowsPage,
  incrementTopRatedTvPage,
  incrementTvAiringTodayPage,
  incrementTvOnTheAirPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
