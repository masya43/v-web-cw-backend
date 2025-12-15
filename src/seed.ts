import { AppDataSource } from "./shared/db/data-source";
import { ProductOrmEntity } from "./modules/product/infrastructure/typeorm/product.orm-entity";
import { ProductPriceOrmEntity } from "./modules/product/infrastructure/typeorm/product-price.orm-entity";
import { CategoryOrmEntity } from "./modules/category/infrastructure/typeorm/category.orm-entity";

async function seed() {
  await AppDataSource.initialize();

  // Почистим таблицы (для учебного MVP — нормально)
  // Если какой-то таблицы нет — просто проигнорируем
  try {
    await AppDataSource.query(
      `TRUNCATE TABLE product_prices, product_categories, categories, products RESTART IDENTITY CASCADE;`,
    );
  } catch {}

  const categoryRepo = AppDataSource.getRepository(CategoryOrmEntity);
  const productRepo = AppDataSource.getRepository(ProductOrmEntity);
  const priceRepo = AppDataSource.getRepository(ProductPriceOrmEntity);

  // Категории
  const categories = await categoryRepo.save([
    categoryRepo.create({ name: "Смартфоны", slug: "smartphones" }),
    categoryRepo.create({ name: "Наушники", slug: "headphones" }),
    categoryRepo.create({ name: "Ноутбуки", slug: "laptops" }),
    categoryRepo.create({ name: "Планшеты", slug: "tablets" }),
  ]);

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  // Товары (без цены — цена отдельно)
  const products = await productRepo.save([
    productRepo.create({
      name: "Смартфон X1",
      description: "OLED, 128GB, 5G",
      imageUrl: "https://placehold.co/600x400?text=Smartphone+X1",
      categories: [bySlug["smartphones"]],
    }),
    productRepo.create({
      name: "Наушники Pro",
      description: "ANC, Bluetooth 5.3",
      imageUrl: "https://placehold.co/600x400?text=Headphones+Pro",
      categories: [bySlug["headphones"]],
    }),
    productRepo.create({
      name: "Ноутбук Air 14",
      description: '14", 16GB RAM, 512GB SSD',
      imageUrl: "https://placehold.co/600x400?text=Laptop+Air+14",
      categories: [bySlug["laptops"]],
    }),
    productRepo.create({
      name: "Планшет Tab 11",
      description: '11", 256GB',
      imageUrl: "https://placehold.co/600x400?text=Tablet+Tab+11",
      categories: [bySlug["tablets"]],
    }),
  ]);

  // Цены (текущая цена = validTo = null)
  const now = new Date();
  await priceRepo.save([
    priceRepo.create({ productId: products[0].id, priceRub: 29990, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[1].id, priceRub: 9990, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[2].id, priceRub: 89990, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[3].id, priceRub: 39990, validFrom: now, validTo: null }),
  ]);

  console.log("Seed done");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
