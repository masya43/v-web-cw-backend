import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from "typeorm";
import { ProductOrmEntity } from "./product.orm-entity";

@Entity("product_prices")
@Index(["productId", "validFrom"])
export class ProductPriceOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  productId!: string;

  @ManyToOne(() => ProductOrmEntity, (p) => p.prices, { onDelete: "CASCADE" })
  product!: ProductOrmEntity;

  @Column("int")
  priceRub!: number;

  @CreateDateColumn({ type: "timestamptz" })
  validFrom!: Date;

  @Column({ type: "timestamptz", nullable: true })
  validTo!: Date | null;
}