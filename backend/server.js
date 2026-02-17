import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import userrouter from "./routes/userRoute.js";
import videoRouter from "./routes/videoRoute.js";   // ⭐ ADD VIDEO ROUTE

const app = express();

app.use(cors());
app.use(express.json());

/* ⭐ IMPORTANT — serve uploaded files */
app.use("/uploads", express.static("uploads"));

/* database connection */
connectDB();

/* test route */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* routes */
app.use("/api/user", userrouter);
app.use("/api/video", videoRouter);   //  ADD THIS

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
