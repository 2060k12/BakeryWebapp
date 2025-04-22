import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VideoModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  videoUrl!: string;
}
