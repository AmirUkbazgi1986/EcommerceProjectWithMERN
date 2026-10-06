import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User login route
userRouter.post("/login", loginUser);

// User registration route
userRouter.post("/register", registerUser);

// Admin login route
userRouter.post("/admin", loginAdmin);

export default userRouter;
