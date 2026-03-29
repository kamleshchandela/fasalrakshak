import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { saveScan, getUserScans } from "../controllers/scanController.js";

const router = express.Router();

router.post("/", protect, saveScan);
router.get("/", protect, getUserScans);

export default router;
