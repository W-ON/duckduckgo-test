import { PaginatedResponse, QueryHistoryItem, SearchResult } from "./types";
import { API_BASE_URL } from "../../../config";

export const searchAPI = {
  search: async (
    query: string,
    page: number,
    pageSize: number
  ): Promise<PaginatedResponse<SearchResult>> => {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(
        query
      )}&page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error("Search failed");
    return response.json();
  },

  fetchHistory: async (): Promise<QueryHistoryItem[]> => {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) throw new Error("Failed to fetch history");
    return response.json();
  },
};
