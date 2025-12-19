import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '@/types/tmdb';

interface UiState {
  isLoading: boolean;
  error: string | null;

  searchQuery: string;
  searchResults: SearchResult[];
}

const initialState: UiState = {
  isLoading: false,
  error: null,

  searchQuery: '',
  searchResults: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.searchResults = action.payload;
    },

    resetUiState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.searchQuery = '';
      state.searchResults = [];
    },
  },
});

export const {
  setLoading,
  setError,
  setSearchQuery,
  setSearchResults,
  resetUiState,
} = uiSlice.actions;

export default uiSlice.reducer;
