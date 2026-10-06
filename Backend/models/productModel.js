import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlength: [100, "Product name should not be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    image: {
      type: Array,
      required: [true, "Please provide product image"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: {
        values: ["men", "women", "kids"],
        message:
          "{VALUE} is not supported. Please choose from men, women, kids",
      },
    },
    subCategory: {
      type: String,
      required: [true, "Please provide product sub-category"],
      enum: {
        values: ["Topwear", "Bottomwear", "Winterwear"],
        message:
          "{VALUE} is not supported. Please choose from Topwear, Bottomwear, Winterwear",
      },
    },
    size: {
      type: String,
      required: [true, "Please provide product size"],
      enum: {
        values: ["S", "M", "L", "XL", "XXL"],
        message:
          "{VALUE} is not supported. Please choose from S, M, L, XL, XXL",
      },
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);

export default Product;
