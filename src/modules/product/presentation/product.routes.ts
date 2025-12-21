import { Router } from "express";
import { z } from "zod";
import { AppDataSource } from "../../../shared/db/data-source";
import { ProductOrmEntity } from "../infrastructure/typeorm/product.orm-entity";

export const productRouter = Router();

function getCurrentPriceRub(prices: { priceRub: number; validFrom: Date; validTo: Date | null }[]) {
  if (!prices?.length) return null;

  const current = prices.find((p) => p.validTo === null);
  if (current) return current.priceRub;

  // если вдруг нет validTo=null, берём самую позднюю validFrom
  const sorted = [...prices].sort((a, b) => +new Date(b.validFrom) - +new Date(a.validFrom));
  return sorted[0]?.priceRub ?? null;
}

productRouter.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository(ProductOrmEntity);

  const category = typeof req.query.category === "string" ? req.query.category : null;

  const qb = repo
    .createQueryBuilder("p")
    .leftJoinAndSelect("p.categories", "c")
    .leftJoinAndSelect("p.prices", "pp")
    .orderBy("p.name", "ASC");

  if (category) {
    qb.andWhere("c.slug = :slug", { slug: category });
  }

  const items = await qb.getMany();

  res.json(
    items.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      imageUrl: p.imageUrl,
      priceRub: getCurrentPriceRub(p.prices),
      ozonUrl: p.ozonUrl, 
      categories: (p.categories ?? []).map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
    })),
  );
});


productRouter.get("/:id", async (req, res) => {
  const parsed = z.string().uuid().safeParse(req.params.id);
  if (!parsed.success) return res.status(400).json({ message: "Invalid id" });

  const repo = AppDataSource.getRepository(ProductOrmEntity);

  const p = await repo.findOne({
    where: { id: parsed.data },
    relations: { categories: true, prices: true },
  });

  if (!p) return res.status(404).json({ message: "Not found" });

  res.json({
    id: p.id,
    name: p.name,
    description: p.description,
    imageUrl: p.imageUrl,
    priceRub: getCurrentPriceRub(p.prices),
    ozonUrl: p.ozonUrl, 
    categories: (p.categories ?? []).map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
  });
});
