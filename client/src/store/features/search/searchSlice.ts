import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  SearchState,
  PaginatedResponse,
  SearchResult,
  QueryHistoryItem,
} from "./types";
import { searchAPI } from "./searchAPI";

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
  history: [],
  currentPage: 1,
  itemsPerPage: 10,
  highlightTerm: "",
  totalPages: 0,
  total: 0,
  currentQuery: "",
};

export const searchQuery = createAsyncThunk<
  PaginatedResponse<SearchResult>,
  { query: string; page: number }
>("search/query", async ({ query, page }, { getState }) => {
  const state = getState() as { search: SearchState };
  return searchAPI.search(query, page, state.search.itemsPerPage);
});

export const fetchHistory = createAsyncThunk<QueryHistoryItem[]>(
  "search/fetchHistory",
  async () => {
    return searchAPI.fetchHistory();
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setHighlightTerm: (state, action: PayloadAction<string>) => {
      state.highlightTerm = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
        state.currentPage = action.payload.page;
      })
      .addCase(searchQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed";
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch history";
      });
  },
});

export const { setHighlightTerm, setCurrentPage, setCurrentQuery } =
  searchSlice.actions;
export default searchSlice.reducer;
