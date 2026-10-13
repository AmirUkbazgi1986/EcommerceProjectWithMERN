import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  uploadProductImages,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", adminAuth, uploadProductImages, addProduct);
productRouter.patch("/:id", adminAuth, updateProductById);
productRouter.delete("/:id", adminAuth, deleteProductById);

export default productRouter;

/*
This is an alternative way to define the routes using different HTTP methods and endpoints. You can choose either approach based on your preference.

productRouter.post("/add", addProduct);
productRouter.post("/remove", deleteProductById);
productRouter.post("/single", getProductById);
productRouter.get("/list", getAllProducts);
productRouter.put("/:id", updateProductById);

*/
