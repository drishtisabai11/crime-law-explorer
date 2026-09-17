import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import archiveRoutes from "./routes/archiveRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/archive", archiveRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Crime & Law Explorer API is running",
  });
});

export default app;