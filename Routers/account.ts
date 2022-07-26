import { Router } from "express";
import accountController from "../controllers/accountController";
import middlewareController from "../controllers/middlewareController";

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
account.delete(
  "/delete-account/:id",
  middlewareController.verifyTokenAndAdminAuth,
  accountController.delete
);

export default account;
