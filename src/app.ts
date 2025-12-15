import express from "express";
import cors from "cors";
import { productRouter } from "./modules/product/presentation/product.routes";
import { authRouter } from "./modules/auth/presentation/auth.routes";
import { cartRouter } from "./modules/cart/presentation/cart.routes";
import { categoryRouter } from "./modules/category/presentation/category.routes";

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/products", productRouter);
	app.use("/api/auth", authRouter);
	app.use("/api/cart", cartRouter);
  app.use("/api/categories", categoryRouter);

  return app;
};
