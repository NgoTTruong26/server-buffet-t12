import "reflect-metadata";
import { DataSource } from "typeorm";
import { Bookings } from "../entity/Bookings";
import { Position } from "../entity/Position";
import { Posts } from "../entity/Posts";
import { User } from "../entity/User";

const entities = [User, Posts, Position, Bookings];

export const AppDataSource = new DataSource({
  migrationsTableName: "migrations",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: null!,
  database: "t12",
  synchronize: true,
  logging: false,
  entities,
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscriber/**/*{.ts,.js}"],
});
