// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000;
// const port = 4000;

// Connect to the database
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

//Api endpoints
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
