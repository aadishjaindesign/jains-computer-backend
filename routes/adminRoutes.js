import express from "express";
import {
  loginAdmin,
  getLeads,
  deleteLead,
  updateLeadStatus,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);   // ✅ NEW
router.post("/reset-password", resetPassword);     // ✅ NEW

router.get("/leads", authMiddleware, getLeads);
router.delete("/lead/:id", authMiddleware, deleteLead);
router.put("/lead/:id", authMiddleware, updateLeadStatus);
router.put("/update-password", authMiddleware, updatePassword);

export default router;