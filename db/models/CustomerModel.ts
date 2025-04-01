import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

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
  AddressDescription!: string;

  @Column({ type: "text", nullable: true })
  identityProof?: string;
}
