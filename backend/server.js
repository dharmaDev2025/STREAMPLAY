import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import userRouter from "./routes/userRoute.js";
import videoRouter from "./routes/videoRoute.js";
import subscriptionRouter from "./routes/subscriptionRoute.js";
import adminRouter from "./routes/adminRoute.js";

import { subscriptionReminderJob } from "./config/cornJobs.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// =======================
// MIDDLEWARE
// =======================

app.use(cors());
app.use(express.json());


// =======================
// STATIC UPLOADS
// =======================

app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);

app.use(
  "/uploads/thumbnails",
  express.static(path.join(__dirname, "uploads/thumbnails"))
);


// =======================
// TEST ROUTE
// =======================

app.get("/", (req, res) => {
  res.send("✅ STREAMPLAY API Running");
});


// =======================
// API ROUTES
// =======================

app.use("/api/user", userRouter);
app.use("/api/video", videoRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/admin", adminRouter);


// =======================
// START SERVER
// =======================

const PORT = process.env.PORT || 5000;

connectDB().then(() => {

  app.listen(PORT, () => {

    console.log("🚀 Server running on port " + PORT);

    // ✅ START CRON JOB AFTER SERVER STARTS
    subscriptionReminderJob();

    console.log("⏰ Subscription Cron Started");

  });

});