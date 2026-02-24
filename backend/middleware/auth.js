import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success:false, msg:"No token" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ⭐ fetch FULL USER FROM DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success:false, msg:"User not found" });
    }

    // ⭐ THIS LINE IS CRITICAL
    req.user = user;

    next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).json({ success:false, msg:"Invalid token" });
  }
};

export default auth;