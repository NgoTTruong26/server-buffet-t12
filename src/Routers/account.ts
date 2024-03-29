import { Router } from "express";
import accountController from "../controllers/accountController";
import middlewareController from "../middlewares/middlewareController";

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
account.post(
  "/logout",
  middlewareController.verifyToken,
  accountController.logout
);
account.delete(
  "/delete-account",
  middlewareController.verifyTokenAndAdminAuthDelete,
  accountController.delete
);
account.post("/refresh", accountController.requestRefreshToken);

export default account;
