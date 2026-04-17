import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: Number(process.env.DB_PORT) || 3306,
})

export default pool
