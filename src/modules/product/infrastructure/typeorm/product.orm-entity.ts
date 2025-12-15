import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class ProductOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "int" })
  priceRub!: number;

  @Column({ type: "text" })
  imageUrl!: string;
}
