import { Router } from "express";
import { body } from "express-validator";
import accountController from "../controllers/accountController";

const account = Router();

account.post(
  "/register-account",
  ...accountController.validationRegister(),
  accountController.register
);
account.post(
  "/login",
  ...accountController.validationLogin(),
  accountController.login
);

export default account;
