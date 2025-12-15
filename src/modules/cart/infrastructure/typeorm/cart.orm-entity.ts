import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Index } from "typeorm";
import { CartItemOrmEntity } from "./cart-item.orm-entity";

@Entity("carts")
export class CartOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column("uuid")
  userId!: string;

  @OneToMany(() => CartItemOrmEntity, (i) => i.cart, { cascade: true })
  items!: CartItemOrmEntity[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
