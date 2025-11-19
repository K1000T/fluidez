import mysql from 'mysql2/promise';

// Use environment variables for credentials; fallback to previous defaults
const DB_HOST = process.env.MYSQL_HOST || 'localhost';
const DB_USER = process.env.MYSQL_USER || 'root';
const DB_PASSWORD = process.env.MYSQL_PASSWORD || '';
const DB_NAME = process.env.MYSQL_DATABASE || 'fluidez_activa';
const DB_PORT = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;

export async function getConnection() {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
  });
}
