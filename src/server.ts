import dotenv from "dotenv";
import app from "./app";
import { createPool } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running at port: ${PORT}`);

  try {
    await createPool();
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
});
