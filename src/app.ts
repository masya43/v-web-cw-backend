import express from "express";
import cors from "cors";
import { productRouter } from "./modules/product/presentation/product.routes";

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/products", productRouter);

  return app;
};
