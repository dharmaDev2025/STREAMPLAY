import express from "express";
import { adminLoginController, getAllUsers } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// LOGIN
router.post("/login", adminLoginController);

// PROTECTED: only admin can fetch users
router.get("/users", adminAuth, getAllUsers);

export default router;