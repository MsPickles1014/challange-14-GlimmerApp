import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};
