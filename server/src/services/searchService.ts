import axios from "axios";
import fs from "fs/promises";
import path from "path";
import {
  DuckDuckGoResponse,
  SearchResult,
  QueryHistoryItem,
  PaginatedResponse,
  SearchParams,
} from "../types/types";

const HISTORY_FILE = path.join(__dirname, "../data/queryHistory.json");
const DEFAULT_PAGE_SIZE = 10;

export class SearchService {
  async search({
    query,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  }: SearchParams): Promise<PaginatedResponse<SearchResult>> {
    try {
      const response = await axios.get<DuckDuckGoResponse>(
        `http://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
      );

      const results: SearchResult[] = [];

      response.data.RelatedTopics.forEach((topic) => {
        if ("Text" in topic && "FirstURL" in topic) {
          if (topic.Text && topic.FirstURL) {
            results.push({
              title: topic.Text,
              url: topic.FirstURL,
            });
          }
        }
      });

      response.data.RelatedTopics.forEach((topic) => {
        if ("Topics" in topic && Array.isArray(topic.Topics)) {
          topic.Topics.forEach((subTopic) => {
            if (subTopic.Text && subTopic.FirstURL) {
              results.push({
                title: subTopic.Text,
                url: subTopic.FirstURL,
              });
            }
          });
        }
      });

      const total = results.length;
      const totalPages = Math.ceil(total / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedResults = results.slice(startIndex, endIndex);

      return {
        data: paginatedResults,
        total,
        page,
        pageSize,
        totalPages,
      };
    } catch (error) {
      console.error("Search error:", error);
      throw new Error("Failed to fetch search results");
    }
  }

  async saveQuery(query: string): Promise<void> {
    try {
      const history = await this.getQueryHistory();
      history.unshift({
        query,
        timestamp: Date.now(),
      });

      await fs.writeFile(HISTORY_FILE, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving query:", error);
      throw new Error("Failed to save query history");
    }
  }

  async getQueryHistory(): Promise<QueryHistoryItem[]> {
    try {
      const data = await fs.readFile(HISTORY_FILE, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}
