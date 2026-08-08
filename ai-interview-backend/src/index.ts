import express from "express";
import cors from "cors";
import interviewRoutes from "./routes/interviewRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/interviews", interviewRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});