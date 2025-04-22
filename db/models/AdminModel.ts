// app/entities/Admin.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
