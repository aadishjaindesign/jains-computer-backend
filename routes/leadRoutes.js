import express from "express";
import {
  createLead,
  getLeads,
  deleteLead,
  updateLeadStatus,
} from "../controllers/leadController.js";

const router = express.Router();

router.post("/lead", createLead);
router.get("/lead", getLeads);
router.delete("/lead/:id", deleteLead);
router.put("/lead/:id", updateLeadStatus);

export default router;