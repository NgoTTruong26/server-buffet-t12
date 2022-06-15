import express from "express";

import { connectDB } from "../config/connectDB";

import { db } from "../models/index";

const cors = require("cors");

const PORT = 3001;

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.post("/create", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  db.User.create({ title, body });
});

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.get("/uu-dai", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`App listening on: http://localhost:${PORT}`);
});
