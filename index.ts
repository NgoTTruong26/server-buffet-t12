import express, { application } from "express";

import { connectDB } from "./config/connectDB";

import cors from "cors";

import routes from "./routers";

import * as dotenv from "dotenv";

const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cors());

connectDB();

app.use(express.json());
app.use(cookieParser());

routes(app);

/* app.get("/uu-dai", async (req, res) => {
  try {
    let page: string;
    let pageNumber: number;

    if (req.query.page) {
      page = req.query.page as string;
      pageNumber = parseInt(page);
    } else {
      pageNumber = 1;
    }

    const limit = 9;

    let data = await db.Posts.findAndCountAll({
      limit: limit,
      offset: limit * (pageNumber - 1),
    });
    res.send({ ...data, totalPage: Math.ceil(data.count / limit) });
  } catch (err) {
    console.log(err);
  }
}); */

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT}`);
});
