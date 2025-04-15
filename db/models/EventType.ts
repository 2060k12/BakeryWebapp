// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./ItemModel";

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

  @OneToMany(() => Item, (item) => item.event)
  item?: Item[];
}
