import { Router } from "express";
import dataController from "../controllers/dataControllers";
import middlewareController from "../middlewares/middlewareController";

const getData = Router();

getData.get("/uu-dai", dataController.getPosts);
getData.get(
  "/all-users",
  middlewareController.verifyAdminAuth,
  dataController.getAllUsers
);

export default getData;
