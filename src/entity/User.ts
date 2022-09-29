import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Bookings } from "./Bookings";
import { Position } from "./Position";

@Entity()
@Unique("UQ_USERNAME", ["username"])
@Unique("UQ_EMAIL", ["email"])
export class User {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_user_id" })
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, name: "date_of_birth" })
  dateOfBirth: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Position, (position) => position.id)
  @JoinColumn({
    name: "positionId",
    foreignKeyConstraintName: "fk_position_id",
  })
  position: Position | number = 1;

  @OneToMany(() => Bookings, (bookings) => bookings.user, { nullable: true })
  bookings: Bookings[];
}
