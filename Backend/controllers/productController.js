import Product from "../models/productModel.js";
import upload from "../middleware/multer.js";
import cloudinary from "cloudinary";
export const uploadProductImages = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

// 1. function for add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const image = [image1, image2, image3, image4].filter(
      (items) => items !== undefined,
    );

    // Upload images to Cloudinary and get their URLs
    let imageUrls = await Promise.all(
      image.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    // If no images were uploaded, set imageUrls to an empty array
    if (imageUrls.length === 0) {
      imageUrls = [];
    }

    // Validate required fields
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !subCategory ||
      !size ||
      !bestseller
    ) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Create new product
    const newProduct = new Product({
      name,
      price: Number(price),
      description,
      image: imageUrls,
      category,
      subCategory,
      size: JSON.parse(size), // Convert string to array
      bestSeller: bestseller === "true" ? true : false, // Convert string to boolean
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. function for get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, results: products.length, products });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. function for get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. function for update product by id
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Update product by ID error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. function for delete product by id
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product by ID error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
