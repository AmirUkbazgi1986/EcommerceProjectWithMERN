import productModel from "../models/productModel.js";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import { products } from "../assets/product.js";

const LoadDB = async () => {
  await connectDB();
  await connectCloudinary();
};

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await LoadDB();
    await productModel.create(products);

    console.log("Data is successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await LoadDB();
    await productModel.deleteMany();
    console.log("Data is successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const run = async () => {
  if (process.argv[2] === "--import") {
    await importData();
  } else if (process.argv[2] === "--delete") {
    await deleteData();
  } else {
    console.log("Please use --import or --delete");
    process.exit(1);
  }
};
run();
