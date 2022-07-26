import { Model, DataTypes } from "sequelize";

import { sequelize } from ".";

const BookingsDefinition = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  fullName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.BOOLEAN,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  admin: {
    type: DataTypes.BOOLEAN,
  },
};

export interface UsersAttributes {
  id?: string;
  fullName: string;
  username: string;
  password: string;
  dateOfBirth?: string;
  email?: string;
  gender?: boolean;
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  admin?: boolean;
}

/* export interface PostsCreationAttributes
  extends Optional<PostsAttributes, 'id'> {} */

export class Users extends Model<UsersAttributes> implements UsersAttributes {
  public id?: string;
  public fullName!: string;
  public username!: string;
  public password!: string;
  public dateOfBirth?: string;
  public email?: string;
  public gender?: boolean;
  public phoneNumber?: string;
  public address?: string;
  public avatar?: string;
  public admin?: boolean;
}

Users.init(BookingsDefinition, {
  sequelize,
  tableName: "users",
});
