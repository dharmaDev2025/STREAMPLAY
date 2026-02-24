import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ================= ADMIN LOGIN =================
export const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASS
    ) {
      return res.json({ success: false, msg: "Invalid Admin Credentials" });
    }

    const token = jwt.sign(
      { email, role: "admin", isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, admin: true });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

// ================= GET ALL USERS =================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};