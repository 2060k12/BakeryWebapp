// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./CategoryModel";

export enum DietaryOption {
  VEGAN = "VEGAN",
  DAIRY_FREE = "DAIRY_FREE",
  VEGETARIAN_CONTAINS_EGG = "VEGETARIAN_CONTAINS_EGG",
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  name!: string;

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

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
