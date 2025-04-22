import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./OrderModel";
import { Item } from "./ItemModel";
import { v4 as uuidv4 } from "uuid";
import type { Relation } from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @ManyToOne(() => Orders, (order) => order)
  order!: Orders;

  @ManyToOne(() => Item)
  item!: Relation<Item>;

  @Column()
  quantity!: number;
}
