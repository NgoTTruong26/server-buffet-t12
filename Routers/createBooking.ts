import { Router } from "express";

import dataController from "../controllers/dataControllers";

const routerBooking = Router();

routerBooking.post("/create-booking", dataController.createBooking);

export default routerBooking;
