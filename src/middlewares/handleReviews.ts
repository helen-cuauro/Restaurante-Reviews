import { Request, Response, NextFunction } from "express";

export default function handleReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals["id"] = req.params["id"];
  next();
}
