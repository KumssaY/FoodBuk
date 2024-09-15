import express, {Router} from "express";
import {
    addComplaints,
    getComplaint,
    getComplaints
} from "../controllers/complaints.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

/* READ */
router.get("/", verifyToken, getComplaints);
router.get("/:id", verifyToken, getComplaint);

/* WRITE */
router.post("/", verifyToken, addComplaints);

export default router;