import express from "express";
import cors from "cors";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { requireTenant } from "./middleware/tenantMiddleware.js";
import { authorizeRoles } from "./middleware/rbacMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
  });
});
app.get(
  "/api/admin-only",
  protect,
  requireTenant,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Admin route works",
      tenant: req.tenant,
    });
  }
);

app.get(
  "/api/staff-or-admin",
  protect,
  requireTenant,
  authorizeRoles("admin", "staff"),
  (req, res) => {
    res.status(200).json({
      message: "Staff or admin route works",
      tenant: req.tenant,
    });
  }
);
app.get("/api/test-user", async (req, res) => {
  const count = await User.countDocuments();
  res.json({ message: "User model works", count });
});
app.get("/api/tenant-context", protect, requireTenant, (req, res) => {
  res.status(200).json({
    message: "Tenant context loaded",
    user: req.user,
    tenant: req.tenant,
  });
});
app.use("/api/tenants", tenantRoutes);
app.use("/api/auth", authRoutes);
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route works",
    user: req.user,
  });
});

export default app;