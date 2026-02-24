import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ success: false, msg: "No token provided" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin)
      return res.status(403).json({ success: false, msg: "Not an admin" });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

export default adminAuth;