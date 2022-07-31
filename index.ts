import express from "express";

import { connectDB } from "./config/connectDB";

import cors from "cors";

import routes from "./routers";

import * as dotenv from "dotenv";

import * as redis from "redis";

const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

export const client = redis.createClient();

app.use(express.json());

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT}`);
});
