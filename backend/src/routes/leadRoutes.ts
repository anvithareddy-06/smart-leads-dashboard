import express from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createLead);

router.get("/", authMiddleware, getLeads);

router.get("/:id", authMiddleware, getLeadById);

router.put("/:id", authMiddleware, updateLead);

router.delete("/:id", authMiddleware, deleteLead);

export default router;