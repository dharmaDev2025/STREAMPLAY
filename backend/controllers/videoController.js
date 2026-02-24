import Video from "../models/Video.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ================= UPLOAD VIDEO =================
export const uploadVideo = async (req, res) => {
  try {
    const videoFile = req.files.video[0].filename;
    const thumb = req.files.thumbnail[0].filename;

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      subscription: req.body.subscription, // "free" OR "premium"
      videoUrl: videoFile,
      thumbnail: thumb
    });

    res.json({ success: true, video });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// ================= GET ALL VIDEOS =================
export const getallVideo = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({ success: true, videos });
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// ================= SEARCH VIDEOS =================
export const searchVideo = async (req, res) => {
  try {
    const keyword = req.query.q || "";
    const videos = await Video.find({
      title: { $regex: keyword, $options: "i" }
    });
    res.json({ success: true, videos });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

// ================= WATCH VIDEO =================
// Handles FREE and PREMIUM videos
// ================= WATCH VIDEO =================
export const watchVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    console.log("Received videoId:", videoId); // Debug

    if (!videoId) return res.json({ success: false, msg: "Video ID required" });

    const video = await Video.findById(videoId);
    if (!video) return res.json({ success: false, msg: "Video not found" });

    //  Free video → allow anyone
    if (video.subscription === "free") return res.json({ success: true, video });

    // Premium video → check user
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.json({
        success: false,
        premiumRequired: true,
        msg: "Login & active subscription required",
      });
    }

    const token = header.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.json({
        success: false,
        premiumRequired: true,
        msg: "Invalid token. Login again",
      });
    }

    const user = await User.findById(decoded.id);
    console.log("User subscription info:", user?.subscription); // Debug

    //  Check active subscription
    if (
      !user?.subscription ||
      user.subscription.status !== "active" ||
      new Date(user.subscription.expireDate) < new Date()
    ) {
      return res.json({
        success: false,
        premiumRequired: true,
        msg: "Buy premium plan to watch this video",
      });
    }

    //  Premium user → allow
    return res.json({ success: true, video });
  } catch (err) {
    console.error("watchVideo error:", err.message);
    res.json({ success: false, msg: err.message });
  }
};

// ================= DELETE VIDEO =================
export const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;
    if (!videoId) return res.json({ success: false, msg: "Video ID required" });

    await Video.findByIdAndDelete(videoId);
    res.json({ success: true, message: "Video deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= UPDATE VIDEO =================
export const updateVideo = async (req, res) => {
  try {
    const { title, description, thumbnail } = req.body;
    const videoId = req.params.id;
    if (!videoId) return res.json({ success: false, msg: "Video ID required" });

    await Video.findByIdAndUpdate(videoId, { title, description, thumbnail });
    res.json({ success: true, message: "Video updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};