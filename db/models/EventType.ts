// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class EventType {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
