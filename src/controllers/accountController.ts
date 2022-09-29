import { Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { User } from "../entity/User";

import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { Position } from "../entity/Position";

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
    /* try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const fullNameReq: string = req.body.fullName;
      const usernameReq: string = req.body.username;
      const passwordReq: string = req.body.password;

      const user = await this.userRepository.create({
        fullName: fullNameReq,
        username: usernameReq,
        password: passwordReq,
      });

      const getUsers = await this.userRepository.findAndCountAll({
        raw: true,
      });

      const data = getUsers?.rows.map((user) => {
        const { password, ...other } = user;

        return other;
      });

      res.json({
        status: res.statusCode,
        message: "Successfully registered",
        data: {
          count: getUsers.count,
          rows: data,
        },
      });
    } catch (err: any) {
      res.send(err.message);
    } */
  }

  validationLogin(): ValidationChain[] {
    return [body("username").notEmpty(), body("passwordClient").notEmpty()];
  }

  generateAccessToken(user: User, expiresIn = "50s") {
    return jwt.sign(
      {
        id: user.id,
        position: (user.position as Position).position
          ? (user.position as Position).position
          : user.position,
      },
      process.env.JWT_ACCESS_KEY!,
      { expiresIn }
    );
  }

  generateRefreshToken(user: User, expiresIn = "365d") {
    return jwt.sign(
      {
        id: user.id,
        position: (user.position as Position).position
          ? (user.position as Position).position
          : user.position,
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

      const userRepository = AppDataSource.getRepository(User);
      const authAccount = await userRepository.findOne({
        relations: {
          position: true,
        },
        where: { username },
        select: {
          position: {
            position: true,
          },
          username: true,
          address: true,
          email: true,
          firstName: true,
          lastName: true,
          gender: true,
          id: true,
          image: true,
          phoneNumber: true,
          dateOfBirth: true,
        },
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

      return res.status(201).send({
        status: res.statusCode,
        data: {
          ...authAccount,
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
    /* try {
      const idUsers = req.body;

      await Users.destroy({
        where: { id: idUsers },
      });

      const data = await Users.findAndCountAll();

      return res.send({
        status: res.statusCode,
        message: "Successfully",
        data,
      });
    } catch (err) {
      res.status(404).send("Not found");
    } */
  }

  logout(req: Request, res: Response) {
    refreshTokens.filter((token) => token !== req.cookies.refreshToken);

    res.clearCookie("refreshToken");
    return res.json("Logged out success!");
  }
}

export default new AccountController();
