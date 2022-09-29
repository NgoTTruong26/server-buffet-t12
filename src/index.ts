import express from "express";

import cors from "cors";

import routes from "./Routers";

import * as dotenv from "dotenv";

import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

const cookieParser = require("cookie-parser");

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("Connection has been established successfully.");

    const app = express();

    app.use(cookieParser());

    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    app.use(express.json());

    routes(app);

    app.listen(process.env.PORT, () => {
      console.log(`App listening on: http://localhost:${process.env.PORT}`);
    });

    /* console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);

    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    ); */
  })
  .catch((error) => console.error("Unable to connect to the database:", error));
