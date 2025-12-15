import { createApp } from "./app";
import { AppDataSource } from "./shared/db/data-source";
import { env } from "./shared/env";

async function main() {
  await AppDataSource.initialize();

  const app = createApp();
  app.listen(env.port, () => console.log(`API: http://localhost:${env.port}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
