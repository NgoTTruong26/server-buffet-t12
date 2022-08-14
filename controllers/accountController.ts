import { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { Users } from "../models/user";

import * as jwt from "jsonwebtoken";

const refreshTokens: string[] = [];

class AccountController {
  validationRegister(): ValidationChain[] {
    return [
      body("fullName").notEmpty(),
      body("username").notEmpty().isLength({ min: 1 }),
      body("password").notEmpty().isLength({ min: 1 }),
    ];
  }

  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const fullNameReq: string = req.body.fullName;
      const usernameReq: string = req.body.username;
      const passwordReq: string = req.body.password;

      const user = await Users.create({
        fullName: fullNameReq,
        username: usernameReq,
        password: passwordReq,
      });

      const getNewUser = await Users.findOne({
        raw: true,
        where: { id: user.id },
      });

      const { password, ...other } = getNewUser!;

      console.log(other);

      res.json({
        status: res.statusCode,
        message: "Successfully registered",
        data: other,
      });
    } catch (err: any) {
      res.send(err.message);
    }
  }

  validationLogin(): ValidationChain[] {
    return [body("username").notEmpty(), body("passwordClient").notEmpty()];
  }

  generateAccessToken(user: Users, expiresIn = "15s") {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY!,
      { expiresIn }
    );
  }

  generateRefreshToken(user: Users, expiresIn = "365d") {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY!,
      { expiresIn }
    );
  }

  login = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(401).send({
          err: errors
            .array()
            .reduce((prev: {}[], curr: { param: string; msg: string }) => {
              if (curr.param === "username") curr.param = "Tài khoản";
              if (curr.param === "passwordClient") curr.param = "Mật khẩu";
              return [
                ...prev,
                {
                  status: res.statusCode,
                  err: curr.msg,
                  message: `${curr.param} không hợp lệ!`,
                },
              ];
            }, []),
        });
      }

      const {
        username,
        passwordClient,
      }: { username: string; passwordClient: string } = req.body;

      const authAccount = await Users.findOne({
        raw: true,
        where: { username },
      });

      if (!authAccount) {
        return res.status(401).send({
          status: res.statusCode,
          err: "Unauthorized",
          message: "Tài khoản hoặc mật khẩu không chính xác!",
        });
      }

      const token = this.generateAccessToken(authAccount);

      const refreshToken = this.generateRefreshToken(authAccount);

      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // lúc deploy thì để true
        sameSite: "strict",
      });
      const { password, createdAt, updatedAt, ...other } = authAccount;

      return res.status(201).send({
        status: res.statusCode,
        data: {
          ...other,
          token,
        },
        message: "Successfully!",
      });
    } catch (err) {
      console.log(err);

      res.status(404).send("Not found");
    }
  };

  requestRefreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies);

    if (!refreshToken) return res.status(403).json("You're not Authenticated");

    if (!refreshTokens.includes(refreshToken))
      return res.status(403).json("refresh token is not valid");

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_KEY!,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          return res.status(403).json(err);
        }

        refreshTokens.filter((value) => value !== refreshToken);

        const newAccessToken = this.generateAccessToken(decoded);
        const newRefreshToken = this.generateRefreshToken(decoded);

        refreshTokens.push(newRefreshToken);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        return res.status(200).json({ accessToken: newAccessToken });
      }
    );
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await Users.destroy({
        where: { id },
      });

      if (!data) {
        return res.status(404).send("Not found");
      }
      return res.send("Successfully!!");
    } catch (err) {
      res.status(404).send("Not found");
    }
  }

  logout(req: Request, res: Response) {
    refreshTokens.filter((token) => token !== req.cookies.refreshToken);

    res.clearCookie("refreshToken");
    return res.json("Logged out success!");
  }
}

export default new AccountController();
