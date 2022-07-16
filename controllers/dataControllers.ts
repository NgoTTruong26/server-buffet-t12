import { Request, Response } from "express";
import { Bookings } from "../models/booking";
import { Posts } from "../models/posts";

const dataController = {
  createBooking: async (req: Request, res: Response) => {
    try {
      const numberAdults = req.body.data.numberAdults;
      const numberChildren = req.body.data.numberChildren
        ? req.body.data.numberChildren
        : null;
      const day = req.body.data.day;
      const hours = req.body.data.hours;
      const email = req.body.data.email;
      const author = req.body.data.author;
      const phone = req.body.data.phone;
      const note = req.body.data.note ? req.body.data.note : null;
      await Bookings.create({
        numberAdults,
        numberChildren,
        day,
        hours,
        email,
        author,
        phone,
        note,
      });

      res.send("Đặt bàn thành công!!");
    } catch (err) {
      res.status(404).send("Not found");
    }
  },

  getPosts: async (req: Request, res: Response) => {
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

      let data = await Posts.findAndCountAll({
        limit: limit,
        offset: limit * (pageNumber - 1),
      });
      res.send({ ...data, totalPage: Math.ceil(data.count / limit) });
    } catch (err) {
      console.log(err);
    }
  },
};

export default dataController;
