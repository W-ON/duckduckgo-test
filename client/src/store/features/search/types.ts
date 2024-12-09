export interface SearchResult {
  title: string;
  url: string;
}

export interface QueryHistoryItem {
  query: string;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  history: QueryHistoryItem[];
  currentPage: number;
  itemsPerPage: number;
  highlightTerm: string;
  totalPages: number;
  total: number;
  currentQuery: string;
}
