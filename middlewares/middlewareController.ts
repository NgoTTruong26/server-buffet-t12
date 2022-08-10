import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "process";

class middlewareController {
  verifyToken(req: any, res: Response, next: NextFunction) {
    const token = req.headers.token;
    console.log(token);

    if (!token) {
      return res.status(401).json("you're not authenticated");
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
  }

  verifyTokenAndAdminAuth = (req: any, res: Response, next: NextFunction) => {
    this.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) return next();
      return res.status(403).send("You are not allowed to delete other");
    });
  };
}

export default new middlewareController();
