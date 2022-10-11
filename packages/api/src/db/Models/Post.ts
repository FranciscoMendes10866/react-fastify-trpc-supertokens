import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
@Index(["id", "authorId"], { unique: true })
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "uuid" })
  authorId!: string;

  @Column({ type: "boolean" })
  isPublished!: boolean;
}
