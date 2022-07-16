import { application, Express } from "express";
import account from "./account";
import routerBooking from "./createBooking";
import getData from "./getData";

const routes = (app: Express) => {
  app.use("/bookings", routerBooking);
  app.use("/", getData);
  app.use(account);
};

export default routes;
