import express from "express";
import { getFoodMenu, addFoodMenu } from "../controllers/foodmenu.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFoodMenu);
router.get("/available", verifyToken, getFoodMenu);

/* UPDATE */
router.patch("/", verifyToken, addFoodMenu);

export default router;
