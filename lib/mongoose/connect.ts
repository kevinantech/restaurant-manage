import mongoose from 'mongoose';
import 'dotenv/config';

async function connectDB(): Promise<void> {
  try {
    const dbAccess = process.env.DB_URI!;
    await mongoose.connect(dbAccess);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export { connectDB };
