import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

// Add to cart route
cartRouter.post("/add", authUser, addToCart);

// update the cart route
cartRouter.patch("/:itemId", authUser, updateCart);

// get all cart items route
cartRouter.get("/get", authUser, getCart);

export default cartRouter;
