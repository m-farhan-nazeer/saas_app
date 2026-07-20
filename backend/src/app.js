import express from "express";
import cors from "cors";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
  });
});

app.get("/api/test-user", async (req, res) => {
  const count = await User.countDocuments();
  res.json({ message: "User model works", count });
});

app.use("/api/auth", authRoutes);
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route works",
    user: req.user,
  });
});

export default app;