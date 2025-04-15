import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./ItemModel";
import type { Relation } from "typeorm";

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column({ unique: true })
  code!: string;

  @Column("float")
  discountPercentage!: number;

  @Column({ default: true })
  isActive: boolean = true;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Item, (item) => item.promotion)
  item?: Relation<Item>;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
