import { Router } from "express";
import { z } from "zod";
import { AppDataSource } from "../../../shared/db/data-source";
import { authMiddleware, AuthRequest } from "../../../shared/auth/auth.middleware";
import { CartOrmEntity } from "../infrastructure/typeorm/cart.orm-entity";
import { CartItemOrmEntity } from "../infrastructure/typeorm/cart-item.orm-entity";
import { ProductOrmEntity } from "../../product/infrastructure/typeorm/product.orm-entity";
import { In } from "typeorm";

export const cartRouter = Router();
cartRouter.use(authMiddleware);

function getCurrentPriceRub(prices: { priceRub: number; validFrom: Date; validTo: Date | null }[]) {
  const current = prices?.find((p) => p.validTo === null);
  if (current) return current.priceRub;
  if (!prices?.length) return null;
  const sorted = [...prices].sort((a, b) => +new Date(b.validFrom) - +new Date(a.validFrom));
  return sorted[0]?.priceRub ?? null;
}

cartRouter.get("/", async (req: AuthRequest, res) => {
  const userId = req.userId!;
  const cartRepo = AppDataSource.getRepository(CartOrmEntity);
  const itemRepo = AppDataSource.getRepository(CartItemOrmEntity);
  const productRepo = AppDataSource.getRepository(ProductOrmEntity);

  const cart = await cartRepo.findOne({ where: { userId } });
  if (!cart) return res.json({ items: [] });

  const items = await itemRepo.find({ where: { cartId: cart.id } });
  const productIds = items.map((i) => i.productId);

  const products = productIds.length
  ? await productRepo.find({
      where: { id: In(productIds) },
      relations: { prices: true },
    })
  : [];

  const byId = new Map(products.map((p) => [p.id, p]));

  res.json({
    items: items.map((i) => {
      const p = byId.get(i.productId);
      return {
        productId: i.productId,
        qty: i.qty,
        product: p
          ? {
              id: p.id,
              name: p.name,
              imageUrl: p.imageUrl,
              priceRub: getCurrentPriceRub(p.prices),
            }
          : null,
      };
    }),
  });
});

const upsertSchema = z.object({
  productId: z.string().uuid(),
  qty: z.number().int().min(0).max(999),
});

cartRouter.post("/items", async (req: AuthRequest, res) => {
  const userId = req.userId!;
  const parsed = upsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { productId, qty } = parsed.data;

  const cartRepo = AppDataSource.getRepository(CartOrmEntity);
  const itemRepo = AppDataSource.getRepository(CartItemOrmEntity);

  let cart = await cartRepo.findOne({ where: { userId } });
  if (!cart) cart = await cartRepo.save(cartRepo.create({ userId }));

  const existing = await itemRepo.findOne({ where: { cartId: cart.id, productId } });

  if (qty === 0) {
    if (existing) await itemRepo.remove(existing);
    return res.json({ ok: true });
  }

  if (!existing) {
    await itemRepo.save(itemRepo.create({ cartId: cart.id, productId, qty }));
  } else {
    existing.qty = qty;
    await itemRepo.save(existing);
  }

  res.json({ ok: true });
});
