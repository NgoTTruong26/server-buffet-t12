import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn("uuid", {
    primaryKeyConstraintName: "pk_bookings_id",
  })
  id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ foreignKeyConstraintName: "fk_user_id", name: "User" })
  user: User;

  @Column({ name: "adults" })
  numberAdults: string;

  @Column({ name: "children", nullable: true })
  numberChildren: string;

  @Column({ name: "booking_date" })
  bookingDate: string;

  @Column({ name: "booking_hours" })
  bookingHours: string;

  @Column()
  customer: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  note: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
