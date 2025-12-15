import { Router } from "express";
import { AppDataSource } from "../../../shared/db/data-source";
import { CategoryOrmEntity } from "../infrastructure/typeorm/category.orm-entity";

export const categoryRouter = Router();

categoryRouter.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(CategoryOrmEntity);

  const items = await repo.find({ order: { name: "ASC" } });

  res.json(
    items.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })),
  );
});
