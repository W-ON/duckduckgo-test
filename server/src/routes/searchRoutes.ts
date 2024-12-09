import express, { Response } from "express";
import { SearchService } from "../services/searchService";
import { TypedRequestQuery, TypedRequestBody } from "../types/types";

const router = express.Router();
const searchService = new SearchService();

router.get("/search", async (req: TypedRequestQuery, res: Response) => {
  try {
    const { q, page = "1", pageSize = "10" } = req.query;
    if (!q || typeof q !== "string") {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const results = await searchService.search({
      query: q,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });

    await searchService.saveQuery(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/search", async (req: TypedRequestBody, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const results = await searchService.search({
      query,
      page: 1,
      pageSize: 10,
    });

    await searchService.saveQuery(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/history", async (_req: TypedRequestQuery, res: Response) => {
  try {
    const history = await searchService.getQueryHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
