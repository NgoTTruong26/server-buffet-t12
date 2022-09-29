import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
@Unique("UQ_POSITION", ["position"])
export class Position {
  @PrimaryGeneratedColumn("increment", {
    primaryKeyConstraintName: "pk_positon_id",
  })
  id: number;

  @Column()
  position: string;

  @OneToMany(() => User, (user) => user.id)
  Positions: User[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
