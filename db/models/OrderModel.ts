import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { customAlphabet } from "nanoid";

import { ProofOfPayment } from "./ProofOfPayment";
import { Customers } from "./CustomerModel";
import type { Relation } from "typeorm";
import { Item } from "./ItemModel";
import { CustomOrder } from "./CustomOrder";

export enum OrderStatus {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  READYFORDELIVERY = "READYFORDELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
const nanoid = customAlphabet("0123456789", 8);

@Entity()
export class Orders {
  @PrimaryColumn({ unique: true })
  id?: string;

  @BeforeInsert()
  generateId() {
    this.id = nanoid(8);
  }

  @Column({ type: "text", nullable: true })
  orderName?: string;

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

  @OneToMany(() => CustomOrder, (item) => item.order)
  customOrder!: Relation<CustomOrder[]>;

  @ManyToOne(() => Customers)
  customer!: Relation<Customers>;
}
