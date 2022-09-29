import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn("uuid", { primaryKeyConstraintName: "pk_post_id" })
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
