import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHander from "../utils/asyncHanler";

const veryfyJwt = asyncHander(
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // @ts-ignore
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
)
export default veryfyJwt;