import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class BusinessDetail {
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
  description!: string;

  @Column()
  imageUrl!: string;

  @Column({ type: "time", nullable: true })
  openingTime!: string;

  @Column({ type: "time", nullable: true })
  closingTime!: string;

  @Column({ type: "json", nullable: true })
  socialMediaLinks?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    WhatsApp?: string;
  };

  @Column({
    nullable: true,
  })
  branchName?: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;
}
