import mongoose from "mongoose";
import "dotenv/config";

async function connectDatabase(): Promise<void> {
  try {
    const dbAccess = <string>process.env.DB_URI;
    await mongoose.connect(dbAccess);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export { connectDatabase };
