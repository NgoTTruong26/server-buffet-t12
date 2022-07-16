import { Model, DataTypes, Optional } from "sequelize";

import { sequelize } from ".";

const BookingsDefinition = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  numberAdults: {
    allowNull: false,
    type: DataTypes.NUMBER,
  },
  numberChildren: {
    type: DataTypes.NUMBER,
  },
  day: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  hours: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.STRING,
  },
  author: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export interface BookingsAttributes {
  id?: string;
  numberAdults: number;
  numberChildren?: number;
  day: string;
  hours: string;
  author: string;
  phone: string;
  email: string;
  note?: string;
}

/* export interface PostsCreationAttributes
  extends Optional<PostsAttributes, 'id'> {} */

export class Bookings
  extends Model<BookingsAttributes>
  implements BookingsAttributes
{
  public id!: string;
  public numberAdults!: number;
  public numberChildren!: number;
  public day!: string;
  public hours!: string;
  public author!: string;
  public phone!: string;
  public email!: string;
}

Bookings.init(BookingsDefinition, {
  sequelize,
  tableName: "bookings",
});
