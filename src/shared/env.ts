import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 3001),
  jwtSecret: process.env.JWT_SECRET ?? "dev_secret_change_me",
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? "cw",
    pass: process.env.DB_PASS ?? "cw",
    name: process.env.DB_NAME ?? "cw",
  },
};
