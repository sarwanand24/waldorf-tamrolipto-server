import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

const verifyAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(
        "Bearer ",
        ""
      );

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const admin = await Admin
      .findById(decoded._id)
      .select("-password -refreshToken");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found"
      });
    }

    req.admin = admin;

    next();
  }
  catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export default verifyAdmin;