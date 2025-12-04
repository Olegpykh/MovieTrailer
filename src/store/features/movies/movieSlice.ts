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
  CastMember
} from '@/types/tmdb';

interface MoviesState {
  searchQuery: string;
  searchResults: SearchResult[];

  movies: Movie[];
  upcomingMovies: Movie[];
  topRatedMovies: Movie[];
  nowPlayingMovies: Movie[];

  popularTVShows: TV[];
  tvOnTheAir: TV[];
  tvAiringToday: TV[];
  topRatedTv: TV[];

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

  popularTVShows: [],
  tvOnTheAir: [],
  tvAiringToday: [],
  topRatedTv: [],

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
    // search
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.searchResults = action.payload;
    },

    // movies
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

    // tv shows
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

    // details
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

    // flags
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
} = moviesSlice.actions;

export default moviesSlice.reducer;


// import { createSlice} from '@reduxjs/toolkit';
// const initialState = {
  
//   searchQuery: '',
//   searchResults: [],

//   movies: [],
//   upcomingMovies: [],
//   topRatedMovies: [],
//   nowPlayingMovies: [],

//   popularTVShows: [],
//   tvOnTheAir: [],
//   tvAiringToday: [],
//   topRatedTv: [],

//   featuredMovies: [],
//   featuredTV: [],

//   movieDetails: null,
//   tvDetails: null,
//   videos: [],
//   cast: [],

//   isLoading: false,
//   error: null,
// };


// const moviesSlice = createSlice({
//   name: 'movies',
//   initialState,
//   reducers: {
//     // search
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//     setSearchResults: (state, action) => {
//       state.searchResults = action.payload;
//     },

//     // movies
//     setMovies: (state, action) => {
//       state.movies = action.payload;
//     },
//     setUpcomingMovies: (state, action) => {
//       state.upcomingMovies = action.payload;
//     },
//     setTopRatedMovies: (state, action) => {
//       state.topRatedMovies = action.payload;
//     },
//     setNowPlayingMovies: (state, action) => {
//       state.nowPlayingMovies = action.payload;
//     },
//     setFeaturedMovies: (state, action) => {
//       state.featuredMovies = action.payload;
//     },

//     // tv shows
//     setPopularTVShows: (state, action) => {
//       state.popularTVShows = action.payload;
//     },
//     setTvOnTheAir: (state, action) => {
//       state.tvOnTheAir = action.payload;
//     },
//     setTvAiringToday: (state, action) => {
//       state.tvAiringToday = action.payload;
//     },
//     setFeaturedTV: (state, action) => {
//       state.featuredTV = action.payload;
//     },
//     setTopRatedTv: (state, action) => {
//       state.topRatedTv = action.payload;
//     },
//     setMovieDetails: (state, action) => {
//       state.movieDetails = action.payload;
//     },
//     setTvDetails: (state, action) => {
//       state.tvDetails = action.payload;
//     },
//     setVideos: (state, action) => {
//       state.videos = action.payload;
//     },
//     setCast: (state, action) => {
//       state.cast = action.payload;
//     },

//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },

//     resetAll: (state) => {
//       state.searchResults = [];
//       state.movies = [];
//       state.upcomingMovies = [];
//       state.topRatedMovies = [];
//       state.nowPlayingMovies = [];
//       state.popularTVShows = [];
//       state.tvOnTheAir = [];
//       state.tvAiringToday = [];
//       state.featuredMovies = [];
//       state.featuredTV = [];
//       state.error = null;
//       state.isLoading = false;
//     },
//   },
// });

// export const {
//   setSearchQuery,
//   setSearchResults,
//   setMovies,
//   setUpcomingMovies,
//   setTopRatedMovies,
//   setNowPlayingMovies,
//   setFeaturedMovies,
//   setPopularTVShows,
//   setTvOnTheAir,
//   setTvAiringToday,
//   setTopRatedTv,
//   setFeaturedTV,
//   setMovieDetails,
//   setTvDetails,
//   setVideos,
//   setCast,
//   setLoading,
//   setError,
//   resetAll,
// } = moviesSlice.actions;

// export default moviesSlice.reducer;
