import mysql from "mysql2/promise";

export const createPool = async () => {
  if (
    !process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_PASSWORD ||
    !process.env.DB_DATABASE
  ) {
    throw new Error("Missing required database configuration variables.");
  }

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    await pool.getConnection();
    console.log("Database connection successful!");
    return pool;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection failed", error.message);
    }
    throw new Error("Database connection filed");
  }
};
