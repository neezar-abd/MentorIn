import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Load .env.local manually
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use direct TCP URL for prisma CLI commands (db push, migrate, etc.)
    url: process.env["DIRECT_DATABASE_URL"]!,
  },
});
