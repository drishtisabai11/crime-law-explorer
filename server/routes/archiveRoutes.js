import express from "express";

import {
  getSavedCases,
  saveCase,
  removeSavedCase,
} from "../controllers/archiveController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSavedCases);

router.post("/", protect, saveCase);

router.delete("/:caseId", protect, removeSavedCase);

export default router;