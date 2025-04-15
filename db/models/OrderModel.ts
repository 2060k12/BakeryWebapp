import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { ProofOfPayment } from "./ProofOfPayment";
import { Customers } from "./CustomerModel";
import type { Relation } from "typeorm";
import { Item } from "./ItemModel";

export enum OrderStatus {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  READYFORDELIVERY = "READYFORDELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column({ type: "float", nullable: false })
  GrossPrice!: number;

  @Column({ type: "text", nullable: true })
  appliedPromo?: string;

  @Column({ type: "float", nullable: true })
  discount?: number;

  @Column({ type: "enum", enum: OrderStatus, nullable: true })
  status?: OrderStatus = OrderStatus.PENDING;

  @Column({ type: "date" })
  deliveryDate!: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  // relations
  @OneToOne(() => ProofOfPayment)
  @JoinColumn()
  proofOfPayment?: Relation<ProofOfPayment>;

  @OneToMany(() => Item, (item) => item.order)
  items!: Relation<Item[]>;

  @ManyToOne(() => Customers)
  customer!: Relation<Customers>;
}
