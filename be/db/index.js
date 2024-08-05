import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const pool = createPool({
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE_NAME,
  user: process.env.MYSQL_USER,
});

const connectToDb = async () => {
  try {
    await pool.getConnection();
    console.log("MySql DB connected successfully.");
  } catch (error) {
    console.log("MySql DB connection error");
    throw error;
  }
};

export { connectToDb, pool };
