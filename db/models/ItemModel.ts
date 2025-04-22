// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./CategoryModel";
import { Promotion } from "./Promotion";
import { EventType } from "./EventType";
import type { Relation } from "typeorm";
import { Orders } from "./OrderModel";

// diatery options enum

export enum DietaryOption {
  VEGAN = "VEGAN",
  DAIRY_FREE = "DAIRY_FREE",
  VEGETARIAN_CONTAINS_EGG = "VEGETARIAN_CONTAINS_EGG",
  All_OPTIONS = "All_OPTIONS",
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  name!: string;

  @Column({ nullable: true })
  itemImage?: string;

  @Column({
    type: "enum",
    enum: DietaryOption,
    nullable: true,
  })
  dietaryOption?: DietaryOption;

  @Column()
  price!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  message?: string;

  @Column({ type: "bool" })
  avaivable: boolean = true;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @ManyToOne(() => Category, (category) => category.items)
  category!: Category;

  @ManyToOne(() => EventType, (event) => event.item)
  event?: EventType;

  @ManyToOne(() => Orders, (order) => order.items)
  order?: Relation<Orders>;

  @OneToOne(() => Promotion, (promotion) => promotion.item)
  @JoinColumn()
  promotion?: Relation<Promotion>;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
