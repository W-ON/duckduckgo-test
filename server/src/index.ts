import express from "express";
import cors from "cors";
import searchRoutes from "./routes/searchRoutes";
import path from "path";
import fs from "fs/promises";

const app = express();
const PORT = process.env.PORT || 3001;

const dataDir = path.join(__dirname, "data");
fs.mkdir(dataDir, { recursive: true }).catch(console.error);

app.use(cors());
app.use(express.json());

app.use("/api", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
