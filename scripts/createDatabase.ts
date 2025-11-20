import "dotenv/config";
import mysql from "mysql2/promise";

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
  const database = decodeURIComponent(u.pathname.replace(/^\//, ""));

  try {
    const conn = await mysql.createConnection({ host, port, user, password });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await conn.end();
    console.log(`Database ensured: ${database}`);
  } catch (err) {
    console.error("Failed to create database:", err);
    process.exit(1);
  }
}

main();