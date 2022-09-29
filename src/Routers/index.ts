import { Express } from "express";
import account from "./account";
import actions from "./actions";
import getData from "./getData";

const routes = (app: Express) => {
  app.use("/actions", actions);
  app.use("/", getData);
  app.use(account);
};

export default routes;
