import { Model, DataTypes, Optional } from "sequelize";

import { sequelize } from ".";

const PostsDefinition = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  body: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

export interface PostsAttributes {
  id: string;
  title: string;
  body: string;
  image: string;
}

/* export interface PostsCreationAttributes
  extends Optional<PostsAttributes, 'id'> {} */

export class Posts extends Model<PostsAttributes> implements PostsAttributes {
  public id!: string;
  public title!: string;
  public body!: string;
  public image!: string;
}

Posts.init(PostsDefinition, {
  sequelize,
  tableName: "posts",
});
