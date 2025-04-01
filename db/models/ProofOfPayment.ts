import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
// import { Orders } from "./OrderModel";

import { Customers } from "./CustomerModel";

@Entity()
export class ProofOfPayment {
  @PrimaryColumn("uuid")
  orderId!: string;

  @ManyToOne(() => Customers, (customer) => customer)
  customers!: Customers;

  @Column({ type: "text", nullable: false })
  proofScreenshot!: string;
}
