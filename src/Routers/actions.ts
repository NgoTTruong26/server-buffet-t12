import { Router } from "express";
import actionController from "../controllers/actionController";
import middlewareController from "../middlewares/middlewareController";

const actions = Router();

actions.post(
  "/create-booking",
  middlewareController.verifyTokenAndBookings,
  actionController.createBooking
);

export default actions;
