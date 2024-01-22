import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { ParamsDictionary } from "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }

  const token = authorization?.split(" ")[1];

  try {
    if (!token) {
      throw new Error("Authorization token required");
    }

    const { _id } = jwt.verify(token, process.env.SECRET as string) as {
      _id: string;
    };

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
