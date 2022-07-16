import { Router } from "express";
import dataController from "../controllers/dataControllers";

const getData = Router();

getData.get("/uu-dai", dataController.getPosts);

export default getData;
