import express from "express";
import { buySubscription } from "../controllers/subscriptionController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/buy", auth, buySubscription);

export default router;