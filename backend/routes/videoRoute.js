import express from "express";
import { watchVideo, getallVideo, uploadVideo, searchVideo, deleteVideo, updateVideo } from "../controllers/videoController.js";
import { upload } from "../config/multer.js";
import auth from "../middleware/auth.js";

const videorouter = express.Router();

// Upload
videorouter.post(
  "/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);

// Get all
videorouter.get("/all", getallVideo);

// Search
videorouter.get("/search", searchVideo);

// Watch
videorouter.get("/watch/:id", watchVideo); // ✅ must be :id

// Delete
videorouter.delete("/:id", deleteVideo);

// Update
videorouter.put("/:id", updateVideo);

export default videorouter;