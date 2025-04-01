// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./ItemModel";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @ManyToOne(() => Item, (item) => item.category)
  items!: Category[];
}
