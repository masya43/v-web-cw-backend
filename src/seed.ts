import { AppDataSource } from "./shared/db/data-source";
import { ProductOrmEntity } from "./modules/product/infrastructure/typeorm/product.orm-entity";

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(ProductOrmEntity);

  const items = [
    {
      name: "Смартфон X1",
      description: "OLED, 128GB, 5G",
      priceRub: 29990,
      imageUrl: "https://picsum.photos/seed/p1/600/400",
    },
    {
      name: "Наушники Pro",
      description: "ANC, Bluetooth 5.3",
      priceRub: 9990,
      imageUrl: "https://picsum.photos/seed/p2/600/400",
    },
    {
      name: "Ноутбук Air 14",
      description: '14", 16GB RAM, 512GB SSD',
      priceRub: 89990,
      imageUrl: "https://picsum.photos/seed/p3/600/400",
    },
    {
      name: "Планшет Tab 11",
      description: '11", 256GB',
      priceRub: 39990,
      imageUrl: "https://picsum.photos/seed/p4/600/400",
    },
  ].map((x) => Object.assign(new ProductOrmEntity(), x));

  await repo.save(items);
  console.log("Seed done");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
