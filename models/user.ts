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
  position: {
    type: DataTypes.STRING,
    defaultValue: "Khách Hàng",
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
  position?: string;
}

/* export interface PostsCreationAttributes
  extends Optional<PostsAttributes, 'id'> {} */

export class Users extends Model<UsersAttributes> implements UsersAttributes {
  readonly id?: string;
  readonly fullName!: string;
  readonly username!: string;
  readonly password!: string;
  readonly dateOfBirth?: string;
  readonly email?: string;
  readonly gender?: boolean;
  readonly phoneNumber?: string;
  readonly address?: string;
  readonly avatar?: string;
  readonly admin?: boolean;
  readonly position?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

Users.init(BookingsDefinition, {
  sequelize,
  tableName: "users",
});
