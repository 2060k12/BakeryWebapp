// app/entities/Cake.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

export enum DietaryOption {
  VEGAN = "VEGAN",
  DAIRY_FREE = "DAIRY_FREE",
  VEGETARIAN_CONTAINS_EGG = "VEGETARIAN_CONTAINS_EGG",
}

@Entity()
export class Cake {
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

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  message?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
