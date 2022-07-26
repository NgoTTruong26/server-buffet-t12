import { Router } from "express";
import dataController from "../controllers/dataControllers";
import middlewareController from "../controllers/middlewareController";

const getData = Router();

getData.get("/uu-dai", dataController.getPosts);
getData.get(
  "/all-users",
  middlewareController.verifyToken,
  dataController.getAllUsers
);

export default getData;
