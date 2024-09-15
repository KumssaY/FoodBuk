import express from "express";
import { addOrder,getOrderHistory,getOrderDetails } from "../controllers/order.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE ORDER */
router.post("/:userId", verifyToken, addOrder);

/* READ */
router.get("/lastorder", verifyToken, getOrderDetails)
router.get("/history/:userId", verifyToken, getOrderHistory);

export default router;