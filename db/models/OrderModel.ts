import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";
import { Item } from "./ItemModel";
import { ProofOfPayment } from "./ProofOfPayment";

enum OrderStatus {
  PENDING = "pending",
  ONGOING = "onGoing",
  READYFORDELIVERY = "readyForDelivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @ManyToOne(() => Item, { nullable: true })
  items?: Item[];

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
  proofOfPayment?: ProofOfPayment;
}
