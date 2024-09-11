import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error hashing password" });
  }
};

export default hashPassword;
