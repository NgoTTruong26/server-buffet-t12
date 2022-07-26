import { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { Users } from "../models/user";

import * as jwt from "jsonwebtoken";

class BaseController {
  validate(a: number) {}
}

class AccountController implements BaseController {
  constructor() {}

  validationRegister(): ValidationChain[] {
    return [
      body("fullName").notEmpty(),
      body("username").notEmpty().isLength({ min: 1 }),
      body("password").notEmpty().isLength({ min: 1 }),
    ];
  }

  validate() {}

  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const fullName: string = req.body.fullName;
      const username: string = req.body.username;
      const password: string = req.body.password;

      await Users.create({ fullName, username, password });

      res.send("Successfully registered");
    } catch (err: any) {
      res.send(err.message);
    }
  }

  validationLogin(): ValidationChain[] {
    return [body("username").notEmpty(), body("passwordClient").notEmpty()];
  }

  generateAccessToken(user: Users, expiresIn: string) {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY!,
      { expiresIn }
    );
  }

  generateRefreshToken(user: Users, expiresIn: string) {
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
          message: "Tài khoản hoặc không chính xác!",
        });
      }

      const { password, ...other } = authAccount;

      const token = this.generateAccessToken(authAccount, "1h");

      const refreshToken = this.generateRefreshToken(authAccount, "365d");

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

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
}

export default new AccountController();
