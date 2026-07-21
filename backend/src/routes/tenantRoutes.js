import express from "express";
import { createTenant,getMyTenants } from "../controllers/tenantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTenant);
router.get("/my-tenants", protect, getMyTenants)
export default router;