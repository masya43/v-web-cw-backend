import { AppDataSource } from "./shared/db/data-source";
import { ProductOrmEntity } from "./modules/product/infrastructure/typeorm/product.orm-entity";
import { ProductPriceOrmEntity } from "./modules/product/infrastructure/typeorm/product-price.orm-entity";
import { CategoryOrmEntity } from "./modules/category/infrastructure/typeorm/category.orm-entity";

async function seed() {
  await AppDataSource.initialize();

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
  categoryRepo.create({ name: "Модули для ПК", slug: "pc-modules" }),
  categoryRepo.create({ name: "Разветвители в авто", slug: "cigarette-splitters" }),
  categoryRepo.create({ name: "Лампы для стола", slug: "desk-lamps" }),
  categoryRepo.create({ name: "Спорт и отдых", slug: "sports" }),
  ]);

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

  // Товары (без цены — цена отдельно)
  const products = await productRepo.save([
    productRepo.create({
  name: "Модуль для удаленного включения ПК компьютера голосом, Алисой, умным домом, с телефона",
  description: `Артикул
1293460177
Тип
Модуль расширения умного дома
Вид модуля
Выключатель
Управление со смартфона
Да
Питание от
от шины
Количество в упаковке, шт
1
Цвет
Черный матовый, серый
Система умного дома
Яндекс
Поддерживаемые протоколы и ПО
Wi-Fi 2.4 ГГц`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-5/wc1000/7383025193.jpg",
  ozonUrl: "https://www.ozon.ru/product/modul-dlya-udalennogo-vklyucheniya-pk-kompyutera-golosom-alisoy-umnym-domom-s-telefona-1293460177/",
  categories: [bySlug["pc-modules"]],
}),

productRepo.create({
  name: "WI-FI модуль удаленного включения компьютера / Дистанционный выключатель PCIE для ПК SmartLife Алиса",
  description: `Артикул
1735828699
Тип
Модуль расширения умного дома
Вид модуля
Выключатель
Управление со смартфона
Да
Питание от
от шины
Количество в упаковке, шт
1
Цвет
Черный, черный матовый, черно-серый
Система умного дома
Яндекс, Smart Life (Tuya)
Поддерживаемые протоколы и ПО
Wi-Fi 2.4 ГГц, Bluetooth/BLE`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-c/wc1000/7383005328.jpg",
  ozonUrl: "https://www.ozon.ru/product/wi-fi-modul-udalennogo-vklyucheniya-kompyutera-distantsionnyy-vyklyuchatel-pcie-dlya-pk-1735828699/",
  categories: [bySlug["pc-modules"]],
}),

productRepo.create({
  name: "Tyua модуль для удаленного включения ПК компьютера голосом, Алисой, умным домом, с телефона",
  description: `Артикул
1946995516
Тип
Модуль расширения умного дома
Вид модуля
Выключатель
Управление со смартфона
Да
Питание от
от шины
Количество в упаковке, шт
1
Цвет
Черный матовый
Система умного дома
Яндекс, Smart Life (Tuya)`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-y/wc1000/7394364430.jpg",
  ozonUrl: "https://www.ozon.ru/product/tyua-modul-dlya-udalennogo-vklyucheniya-pk-kompyutera-golosom-alisoy-umnym-domom-s-telefona-1946995516/",
  categories: [bySlug["pc-modules"]],
}),

productRepo.create({
  name: "Модуль для удаленного включения ПК компьютера голосом, Алисой, умным домом, с телефона",
  description: `Артикул
2361288778
Тип
Модуль расширения умного дома
Вид модуля
Выключатель
Управление со смартфона
Да
Питание от
от шины
Количество в упаковке, шт
1
Цвет
Черный матовый, темно-серый
Система умного дома
Яндекс, eWeLink
Поддерживаемые протоколы и ПО
Wi-Fi 2.4 ГГц`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7659312304.jpg",
  ozonUrl: "https://www.ozon.ru/product/modul-dlya-udalennogo-vklyucheniya-pk-kompyutera-golosom-alisoy-umnym-domom-s-telefona-2361288778/",
  categories: [bySlug["pc-modules"]],
}),
    productRepo.create({
  name: "Разветвитель гнезда прикуривателя, разъемы: 4, 8 см",
  description: `Тип
Разветвитель гнезда прикуривателя
Партномер (артикул производителя)
0014
Количество, штук
1
Страна-изготовитель
Китай
Габариты и вес
Ширина, см
7
Технические свойства
Материал
ABS пластик`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-i/wc1000/7391557530.jpg",
  ozonUrl: "https://www.ozon.ru/product/razvetvitel-gnezda-prikurivatelya-razemy-4-8-sm-1655164465/",
  categories: [bySlug["cigarette-splitters"]],
}),

productRepo.create({
  name: "Разветвитель гнезда прикуривателя, разъемы: 5, 8.5 см",
  description: `Артикул
1909826662
Тип
Разветвитель гнезда прикуривателя
Партномер (артикул производителя)
0020
Материал
ABS пластик
Количество выходных разъемов
5
Количество USB портов
2
Входное напряжение, В
12`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-4/wc1000/7391565220.jpg",
  ozonUrl: "https://www.ozon.ru/product/razvetvitel-gnezda-prikurivatelya-razemy-5-8-5-sm-1909826662/",
  categories: [bySlug["cigarette-splitters"]],
}),

productRepo.create({
  name: "Разветвитель гнезда прикуривателя, разъемы: 5, 8.4 см",
  description: `Артикул
2807194638
Тип
Разветвитель гнезда прикуривателя
Партномер (артикул производителя)
0031
Материал
ABS пластик
Количество выходных разъемов
5
Количество USB портов
2
Входное напряжение, В
12`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-h/wc1000/7952025689.jpg",
  ozonUrl: "https://www.ozon.ru/product/razvetvitel-gnezda-prikurivatelya-razemy-5-8-4-sm-2807194638/",
  categories: [bySlug["cigarette-splitters"]],
}),

productRepo.create({
  name: "Разветвитель гнезда прикуривателя, разъемы: 2, 7.9 см",
  description: `Артикул
2818743486
Тип
Разветвитель гнезда прикуривателя
Партномер (артикул производителя)
0032
Материал
ABS пластик
Количество выходных разъемов
2
Количество USB портов
4
Входное напряжение, В
12`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-i/wc1000/7953880950.jpg",
  ozonUrl: "https://www.ozon.ru/product/razvetvitel-gnezda-prikurivatelya-razemy-2-7-9-sm-2818743486/",
  categories: [bySlug["cigarette-splitters"]],
}),

productRepo.create({
  name: "Разветвитель гнезда прикуривателя, разъемы: 6, 10 см",
  description: `Артикул
2807196503
Тип
Разветвитель гнезда прикуривателя
Партномер (артикул производителя)
0020
Материал
ABS пластик
Количество выходных разъемов
6
Количество USB портов
4
Входное напряжение, В
12`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-s/wc1000/7952024836.jpg",
  ozonUrl: "https://www.ozon.ru/product/razvetvitel-gnezda-prikurivatelya-razemy-6-10-sm-2807196503/",
  categories: [bySlug["cigarette-splitters"]],
}),
productRepo.create({
  name: "Лампа для монитора / Светильник светодиодный с креплением на монитор, белый, 50 см",
  description: `Артикул
1699467604
Тип
Настольный светильник
Тип выключателя
Сенсорный
Тип цоколя
LED
Макс. мощность ламп, Вт
5
Высота, мм
106
Вид ламп
Светодиодная
Площадь освещения, кв.м
1
Температура света, К
5500
Световой поток, Лм
200`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-q/wc1000/7384506146.jpg",
  ozonUrl: "https://www.ozon.ru/product/lampa-dlya-monitora-svetilnik-svetodiodnyy-s-krepleniem-na-monitor-belyy-50-sm-1699467604/",
  categories: [bySlug["desk-lamps"]],
}),

productRepo.create({
  name: "Лампа для монитора / Светильник светодиодный с креплением на монитор, черный, 50 см",
  description: `Артикул
1421218443
Тип
Настольный светильник
Тип выключателя
Сенсорный
Тип цоколя
LED
Макс. мощность ламп, Вт
5
Вид ламп
Светодиодная
Площадь освещения, кв.м
1
Температура света, К
5500
Световой поток, Лм
200`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-n/wc1000/7474639307.jpg",
  ozonUrl: "https://www.ozon.ru/product/lampa-dlya-monitora-svetilnik-svetodiodnyy-s-krepleniem-na-monitor-chernyy-50-sm-1421218443/",
  categories: [bySlug["desk-lamps"]],
}),

productRepo.create({
  name: "Портативный вентилятор ventil, светло-бежевый",
  description: `Артикул
1953480325
Тип вентилятора
Портативный
Мощность, Вт
3
Количество скоростей
4
Макс. уровень шума, дБ
36
Тип выключателя
Механический`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-3/wc1000/7500269739.jpg",
  ozonUrl: "https://www.ozon.ru/product/portativnyy-ventilyator-ventil-svetlo-bezhevyy-1953480325/",
  categories: [bySlug["sports"]],
}),

productRepo.create({
  name: "Мини-тренажер fitness",
  description: `Артикул
1998034476
Тип
Мини-тренажер
Страна-изготовитель
Китай
Цвет
Светло-зеленый
Вид крепления тренажера
Без крепления
Макс. нагрузка, кг
400`,
  imageUrl: "https://ir.ozone.ru/s3/multimedia-1-w/wc1000/7439473400.jpg",
  ozonUrl: "https://www.ozon.ru/product/mini-trenazher-fitness-1998034476/",
  categories: [bySlug["sports"]],
}),

  ]);

  // Цены (текущая цена = validTo = null)
  const now = new Date();
  await priceRepo.save([
    // Модули для включения ПК (4 товара)
    priceRepo.create({ productId: products[0].id, priceRub: 2700, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[1].id, priceRub: 1422, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[2].id, priceRub: 2200, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[3].id, priceRub: 1202, validFrom: now, validTo: null }),

    // Разветвители прикуривателя (5 товаров)
    priceRepo.create({ productId: products[4].id, priceRub: 986, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[5].id, priceRub: 1180, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[6].id, priceRub: 798, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[7].id, priceRub: 397, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[8].id, priceRub: 2111, validFrom: now, validTo: null }),

    // Лампы для стола (2 товара)
    priceRepo.create({ productId: products[9].id, priceRub: 2800, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[10].id, priceRub: 3800, validFrom: now, validTo: null }),

    // Спорт и отдых (2 товара)
    priceRepo.create({ productId: products[11].id, priceRub: 166, validFrom: now, validTo: null }),
    priceRepo.create({ productId: products[12].id, priceRub: 2200, validFrom: now, validTo: null }),
  ]);

  console.log("Seed done");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
