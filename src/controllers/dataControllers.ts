import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Posts } from "../entity/Posts";
import { User } from "../entity/User";

class DataController {
  readonly getPosts = async (req: Request, res: Response) => {
    try {
      let page: string;
      let pageNumber: number;

      const limit = 9;

      if (req.query.page) {
        page = req.query.page as string;
        pageNumber = parseInt(page);
      } else {
        pageNumber = 1;
      }

      const postRepository = AppDataSource.getRepository(Posts);

      let data = await postRepository.findAndCount({
        take: limit,
        skip: limit * (pageNumber - 1),

        /* limit: this.limit,
        offset: this.limit * (pageNumber - 1), */
      });

      res.send({
        data: data[0],
        count: data[1],
        totalPage: Math.ceil(data[1] / limit),
      });
    } catch (err) {
      console.log(err);
    }
  };

  async getAllUsers(req: any, res: Response) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const data = await userRepository.findAndCount({
        relations: {
          position: true,
          bookings: true,
        },
        select: {
          position: {
            position: true,
          },
          username: true,
          address: true,
          email: true,
          firstName: true,
          lastName: true,
          gender: true,
          id: true,
          image: true,
          phoneNumber: true,
          createdDate: true,
          deletedDate: true,
          updatedDate: true,
          dateOfBirth: true,
        },
      });

      return res.json({ users: data[0], count: data[1] });
    } catch (err) {
      return res.status(404).send("Not Found");
    }
  }
}

export default new DataController();
