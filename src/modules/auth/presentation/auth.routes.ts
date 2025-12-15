import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../../../shared/db/data-source";
import { env } from "../../../shared/env";
import { UserOrmEntity } from "../../user/infrastructure/typeorm/user.orm-entity";
import { CartOrmEntity } from "../../cart/infrastructure/typeorm/cart.orm-entity";

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(4, "Пароль должен быть минимум 4 символа"),
});

authRouter.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Некорректные данные";
    return res.status(400).json({ code: "VALIDATION_ERROR", message: msg });
  }

  const { email, password } = parsed.data;

  const userRepo = AppDataSource.getRepository(UserOrmEntity);
  const cartRepo = AppDataSource.getRepository(CartOrmEntity);

  const exists = await userRepo.findOne({ where: { email } });
  if (exists) {
    return res.status(409).json({
      code: "EMAIL_EXISTS",
      message: "Пользователь с таким email уже зарегистрирован",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepo.save(userRepo.create({ email, passwordHash }));

  await cartRepo.save(cartRepo.create({ userId: user.id }));

  const token = jwt.sign({ userId: user.id }, env.jwtSecret, { expiresIn: "7d" });
  return res.json({ token });
});

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

authRouter.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Некорректные данные";
    return res.status(400).json({ code: "VALIDATION_ERROR", message: msg });
  }

  const { email, password } = parsed.data;

  const userRepo = AppDataSource.getRepository(UserOrmEntity);
  const user = await userRepo.findOne({ where: { email } });

  // Важно: не палим, существует ли email — одинаковая ошибка
  if (!user) {
    return res.status(401).json({
      code: "INVALID_CREDENTIALS",
      message: "Неверный email или пароль",
    });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({
      code: "INVALID_CREDENTIALS",
      message: "Неверный email или пароль",
    });
  }

  const token = jwt.sign({ userId: user.id }, env.jwtSecret, { expiresIn: "7d" });
  return res.json({ token });
});
