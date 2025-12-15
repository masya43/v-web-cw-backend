import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../env";

import { ProductOrmEntity } from "../../modules/product/infrastructure/typeorm/product.orm-entity";
import { ProductPriceOrmEntity } from "../../modules/product/infrastructure/typeorm/product-price.orm-entity";
import { CategoryOrmEntity } from "../../modules/category/infrastructure/typeorm/category.orm-entity";

import { UserOrmEntity } from "../../modules/user/infrastructure/typeorm/user.orm-entity";
import { CartOrmEntity } from "../../modules/cart/infrastructure/typeorm/cart.orm-entity";
import { CartItemOrmEntity } from "../../modules/cart/infrastructure/typeorm/cart-item.orm-entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  entities: [
    ProductOrmEntity,
    ProductPriceOrmEntity,
    CategoryOrmEntity,
    UserOrmEntity,
    CartOrmEntity,
    CartItemOrmEntity,
  ],
  synchronize: true,
  logging: false,
});
