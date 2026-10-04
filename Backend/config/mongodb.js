import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";

if (!process.env.DATABASE) {
  console.error(
    "CRITICAL ERROR: process.env.DATABASE is not defined. Check your config.env path!",
  );
  process.exit(1);
}

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  await mongoose
    .connect(DB)
    .then(() => console.log("DB connection successful!"))
    .catch((err) =>
      console.error("DB connection failed error 🔥", err.message),
    );
};

export default connectDB;
