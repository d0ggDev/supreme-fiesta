import "dotenv/config";
import mysql from "mysql2/promise";
import { getDb } from "../server/db.ts";
import { galleryImages } from "../drizzle/schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }
  const u = new URL(url);
  const host = u.hostname || "localhost";
  const port = parseInt(u.port || "3306", 10);
  const user = decodeURIComponent(u.username || "root");
  const password = decodeURIComponent(u.password || "");

  const conn = await mysql.createConnection({ host, port, user, password });
  await conn.query("SELECT 1");
  await conn.end();
  console.log("mysql2 ping: ok");

  const db = await getDb();
  if (!db) {
    console.error("drizzle getDb returned null");
    process.exit(1);
  }
  const rows = await db.select().from(galleryImages).limit(1);
  console.log("drizzle query: ok", rows.length);
}

main().catch(err => {
  console.error("DB test failed:", err);
  process.exit(1);
});