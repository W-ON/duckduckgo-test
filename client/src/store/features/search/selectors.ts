import { RootState } from "../..";

export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectSearchHistory = (state: RootState) => state.search.history;
export const selectCurrentPage = (state: RootState) => state.search.currentPage;
export const selectTotalPages = (state: RootState) => state.search.totalPages;
export const selectHighlightTerm = (state: RootState) =>
  state.search.highlightTerm;
export const selectCurrentQuery = (state: RootState) =>
  state.search.currentQuery;
