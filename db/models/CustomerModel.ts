import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import type { Relation } from "typeorm";
@Entity()
export class Customers {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  email!: string;

  @Column({ type: "text", nullable: true })
  addressDescription!: string;

  // storing id photo
  @Column({ type: "text", nullable: true })
  identityProof?: string;
}
