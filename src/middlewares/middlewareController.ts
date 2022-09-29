import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "process";

class middlewareController {
  verifyToken(req: any, res: Response, next: NextFunction) {
    const token = req.headers.token;

    if (!token) {
      return res.status(403).json("you're not authenticated");
    }
    const accessToken = token.split(" ")[1];

    jwt.verify(
      accessToken,
      env.JWT_ACCESS_KEY!,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          return res
            .status(403)
            .json({ status: res.statusCode, err: "Token is not valid" });
        }
        req.user = decoded;
        next();
      }
    );
    return;
  }

  verifyAdminAuth = (req: any, res: Response, next: NextFunction) => {
    this.verifyToken(req, res, () => {
      if (req.user.position === "admin") return next();
      return res.status(403).send("You are not administrater");
    });
  };

  verifyTokenAndAdminAuthDelete = (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    this.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.position === "admin")
        return next();
      return res.status(403).send("You are not allowed to delete other");
    });
  };

  verifyTokenAndBookings = (req: any, res: Response, next: NextFunction) => {
    if (req.body.data.user) {
      return this.verifyToken(req, res, () => {
        if (req.body.id === req.user.id) return next();
        return res
          .status(403)
          .send("You are not allowed to bookings for other people");
      });
    }
    next();
  };
}

export default new middlewareController();
