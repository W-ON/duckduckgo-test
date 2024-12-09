import { searchAPI } from "../searchAPI";
import { API_BASE_URL } from "../../../../config";

describe("searchAPI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("should fetch search results successfully", async () => {
    const mockResponse = {
      data: [{ title: "Test", url: "http://test.com" }],
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await searchAPI.search("test", 1, 10);

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/search?q=test&page=1&pageSize=10`
    );
    expect(result).toEqual(mockResponse);
  });

  it("should fetch history successfully", async () => {
    const mockHistory = [{ query: "test", timestamp: 123456789 }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockHistory),
    });

    const result = await searchAPI.fetchHistory();

    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/history`);
    expect(result).toEqual(mockHistory);
  });
});
