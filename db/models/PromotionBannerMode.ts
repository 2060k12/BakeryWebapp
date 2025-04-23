import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class PromotionBanner {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4();

  @Column()
  promoCode!: string;

  @Column()
  discount!: number;
}
