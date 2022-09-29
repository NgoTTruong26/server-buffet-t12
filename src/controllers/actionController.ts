import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Bookings } from "../entity/Bookings";

class ActionController {
  createBooking = async (req: Request, res: Response) => {
    try {
      /* const numberAdults = req.body.data.numberAdults;
      const numberChildren = req.body.data.numberChildren
        ? req.body.data.numberChildren
        : null;
      const day = req.body.data.day;
      const hours = req.body.data.hours;
      const email = req.body.data.email;
      const author = req.body.data.author;
      const phone = req.body.data.phone;
      const note = req.body.data.note ? req.body.data.note : null; */

      const {
        numberAdults,
        numberChildren,
        bookingDate,
        bookingHours,
        customer,
        email,
        id,
        note,
        phone,
        user,
      } = req.body.data;

      const bookingRepository = AppDataSource.getRepository(Bookings);

      const data = await bookingRepository.save({
        numberAdults,
        numberChildren,
        bookingDate,
        bookingHours,
        customer,
        email,
        id,
        note,
        phone,
        user,
      });

      /* await Bookings.create({
            numberAdults,
            numberChildren,
            day,
            hours,
            email,
            author,
            phone,
            note,
          }); */

      return res.json({ data, message: "Đặt bàn thành công!!" });
    } catch (err) {
      res.status(404).send("Not found");
    }
  };
}

export default new ActionController();
