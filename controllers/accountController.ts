import { Request, response, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import { Users } from "../models/user";

class accountController {
  validationRegister(): ValidationChain[] {
    return [
      body("fullName").notEmpty(),
      body("username").isLength({ min: 8 }),
      body("password").isLength({ min: 6 }),
    ];
  }

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
    return [
      body("username").isLength({ min: 8 }),
      body("password").isLength({ min: 6 }),
    ];
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      /* console.log(errors.array()); */

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const { username, password }: { username: string; password: string } =
        req.body;

      const authAccount = await Users.findOne({
        where: { username },
      });
      /*       console.log(authAccount.dataValues.username); */

      if (!authAccount) {
        return res.status(404).send("tài khoản không hợp lệ");
      }

      if (password !== authAccount.password) {
        return res.status(404).send("Mật khẩu không hợp lệ");
      }

      return res.send("success");
    } catch (err: any) {
      res.status(404).send("Not found");
    }
  }
}
export default new accountController();
