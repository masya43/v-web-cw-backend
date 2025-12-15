import { Router } from "express";
import { z } from "zod";
import { AppDataSource } from "../../../shared/db/data-source.ts";
import { ProductOrmEntity } from "../infrastructure/typeorm/product.orm-entity";

export const productRouter = Router();

productRouter.get("/", async (_req, res) => {
  const repo = AppDataSource.getRepository(ProductOrmEntity);
  const items = await repo.find({ order: { name: "ASC" } });
  res.json(items);
});

productRouter.get("/:id", async (req, res) => {
  const parsed = z.string().uuid().safeParse(req.params.id);
  if (!parsed.success) return res.status(400).json({ message: "Invalid id" });

  const repo = AppDataSource.getRepository(ProductOrmEntity);
  const item = await repo.findOneBy({ id: parsed.data });

  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});
