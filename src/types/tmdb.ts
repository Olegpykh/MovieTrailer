export type ApiResponce<T extends object> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export interface Movie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TV {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Genres {
  id: number;
  name: string;
}

export interface MovieDetails {
  backdrop_path: string;
  genres: Genres[];
  id: number;
  overview: string | null;
  poster_path: string | null;
  release_date: string | null;
  runtime: number | null;
  tagline: string | null;
  title: string;
  name?: never;
  vote_average: number;
}

export interface TvDetails {
  backdrop_path: string | null;
  genres: Genres[];
  first_air_date: string;
  id: number;
  overview: string | null;
  poster_path: string | null;
  tagline: string | null;
  name: string;
  title?: never;
  vote_average: number;
}

interface BaseSearchResult {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string | null;
  genre_ids: number[];
  vote_average: number;
}

export interface MovieSearchResult extends BaseSearchResult {
  media_type: 'movie';
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  name?: never;
  first_air_date?: never;
  known_for?: never;
}

export interface TvSearchResult extends BaseSearchResult {
  media_type: 'tv';
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  title?: never;
  video?: never;
  known_for?: never;
}

export interface PersonSearchResult {
  id: number;
  media_type: 'person';
  name: string;
  profile_path: string | null;
  title?: never;
  first_air_date?: never;
}

export type SearchResult =
  | MovieSearchResult
  | TvSearchResult
  | PersonSearchResult;

export interface Person {
  id: number;
  name: string;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
}

interface BaseCreditItem {
  id: number;
  media_type: 'movie' | 'tv';
  poster_path: string | null;
  character?: string;
}

interface MovieCredit extends BaseCreditItem {
  media_type: 'movie';
  title: string;
  release_date: string | null;
}

interface TvCredit extends BaseCreditItem {
  media_type: 'tv';
  name: string;
  first_air_date: string | null;
}

export type CreditItem = MovieCredit | TvCredit;

export interface PersonCombinedCredits {
  id: number;
  cast: CreditItem[];
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  profile_path: string | null;

}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
}

export interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  size: number;
}

export interface VideosResponse {
  id: number;
  results: VideoItem[];
}



