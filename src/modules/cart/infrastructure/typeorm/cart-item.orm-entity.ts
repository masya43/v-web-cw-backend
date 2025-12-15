import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartOrmEntity } from "./cart.orm-entity";

@Entity("cart_items")
@Index(["cartId", "productId"], { unique: true })
export class CartItemOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  cartId!: string;

  @ManyToOne(() => CartOrmEntity, (c) => c.items, { onDelete: "CASCADE" })
  cart!: CartOrmEntity;

  @Column("uuid")
  productId!: string;

  @Column("int", { default: 1 })
  qty!: number;
}
