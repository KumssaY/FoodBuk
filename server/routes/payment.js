import express from "express";
import { processPayment } from "../controllers/payment.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Process payment for an order
router.post("/:userId", verifyToken, processPayment);

export default router;
