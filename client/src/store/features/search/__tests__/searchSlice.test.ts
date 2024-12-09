import { configureStore, Store } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../..";
import searchReducer, {
  searchQuery,
  fetchHistory,
  setHighlightTerm,
  setCurrentPage,
  setCurrentQuery,
} from "../searchSlice";
import { searchAPI } from "../searchAPI";

jest.mock("../searchAPI");

describe("Search Slice", () => {
  const initialState = {
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

  let store: Store<RootState> & { dispatch: AppDispatch };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        search: searchReducer,
      },
    });
  });

  it("should handle initial state", () => {
    expect(store.getState().search).toEqual(initialState);
  });

  it("should handle setHighlightTerm", () => {
    store.dispatch(setHighlightTerm("test"));
    expect(store.getState().search.highlightTerm).toBe("test");
  });

  it("should handle setCurrentPage", () => {
    store.dispatch(setCurrentPage(2));
    expect(store.getState().search.currentPage).toBe(2);
  });

  it("should handle setCurrentQuery", () => {
    store.dispatch(setCurrentQuery("test query"));
    expect(store.getState().search.currentQuery).toBe("test query");
  });

  it("should handle successful search", async () => {
    const mockResponse = {
      data: [{ title: "Test Result", url: "http://test.com" }],
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };

    (searchAPI.search as jest.Mock).mockResolvedValueOnce(mockResponse);

    await store.dispatch(searchQuery({ query: "test", page: 1 }));

    expect(store.getState().search.results).toEqual(mockResponse.data);
    expect(store.getState().search.loading).toBe(false);
    expect(store.getState().search.error).toBeNull();
  });

  it("should handle failed search", async () => {
    (searchAPI.search as jest.Mock).mockRejectedValueOnce(
      new Error("Search failed")
    );

    await store.dispatch(searchQuery({ query: "test", page: 1 }));

    expect(store.getState().search.loading).toBe(false);
    expect(store.getState().search.error).toBe("Search failed");
  });

  it("should handle successful history fetch", async () => {
    const mockHistoryData = [
      { query: "test query", timestamp: 1234567890 },
      { query: "another query", timestamp: 1234567891 },
    ];

    (searchAPI.fetchHistory as jest.Mock).mockResolvedValueOnce(
      mockHistoryData
    );

    await store.dispatch(fetchHistory());

    expect(store.getState().search.history).toEqual(mockHistoryData);
  });

  it("should handle failed history fetch", async () => {
    (searchAPI.fetchHistory as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch history")
    );

    await store.dispatch(fetchHistory());

    expect(store.getState().search.history).toEqual([]);
  });
});
