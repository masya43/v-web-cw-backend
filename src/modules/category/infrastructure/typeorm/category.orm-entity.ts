import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductOrmEntity } from "../../../product/infrastructure/typeorm/product.orm-entity";

@Entity("categories")
export class CategoryOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @ManyToMany(() => ProductOrmEntity, (p) => p.categories)
  products!: ProductOrmEntity[];
}