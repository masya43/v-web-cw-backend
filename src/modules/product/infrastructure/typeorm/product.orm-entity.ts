import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CategoryOrmEntity } from "../../../category/infrastructure/typeorm/category.orm-entity";
import { ProductPriceOrmEntity } from "./product-price.orm-entity";

@Entity("products")
export class ProductOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "text", nullable: true })
  imageUrl!: string | null;

  @ManyToMany(() => CategoryOrmEntity, (c) => c.products, { cascade: true })
  @JoinTable({
    name: "product_categories",
    joinColumn: { name: "productId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "categoryId", referencedColumnName: "id" },
  })
  categories!: CategoryOrmEntity[];

  @OneToMany(() => ProductPriceOrmEntity, (pp) => pp.product, { cascade: true })
  prices!: ProductPriceOrmEntity[];

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
