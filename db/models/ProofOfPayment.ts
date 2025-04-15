import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Orders } from "./OrderModel";
import type { Relation } from "typeorm";

import { Orders } from "./OrderModel";

@Entity()
export class ProofOfPayment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Orders, (item) => item.proofOfPayment)
  Order?: Relation<Orders>;

  @Column({ type: "text", nullable: false })
  proofScreenshot!: string;
}
