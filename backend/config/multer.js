// config/multer.js
import multer from "multer";
import fs from "fs";
import path from "path";

// Create folders automatically if they don't exist
const videoDir = path.join("uploads", "videos");
const thumbDir = path.join("uploads", "thumbnails");

if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("video")) {
      cb(null, videoDir);
    } else {
      cb(null, thumbDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
