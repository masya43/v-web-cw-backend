import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../env";
import { ProductOrmEntity } from "../../modules/product/infrastructure/typeorm/product.orm-entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.pass,
  database: env.db.name,
  entities: [ProductOrmEntity],
  synchronize: true, // MVP
  logging: false,
});
