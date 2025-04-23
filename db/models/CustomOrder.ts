// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Orders } from "./OrderModel";
import type { Relation } from "typeorm";

export enum DietaryOption {
  VEGAN = "VEGAN",
  DAIRY_FREE = "DAIRY_FREE",
  VEGETARIAN_CONTAINS_EGG = "VEGETARIAN_CONTAINS_EGG",
  All_OPTIONS = "All_OPTIONS",
}

@Entity()
export class CustomOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  name!: string;

  @Column({ nullable: true })
  itemImage?: string;

  @Column()
  price!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  message?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @ManyToOne(() => Orders, (order) => order.customOrder)
  order?: Relation<Orders>;
}
