import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import User from "../models/userModel.js";

// Router handler for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password"); // Include password field for comparison

    // If user not found or password is incorrect
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Router handler for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name);

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Generate JWT token
    const token = newUser.generateAuthToken();

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 1.Router handler for admin login using role field in user model

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password"); // Include password field for comparison

    // If user not found or password is incorrect or user is not admin
    if (
      !user ||
      !(await user.comparePassword(password)) ||
      user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// // 2. Router handler for admin login based on environment variables (ADMIN_EMAIL and ADMIN_PASSWORD)

// const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1.Check if email and password are provided
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please provide email and password" });
//     }

//     // 2.Check if email and password are correct for admin
//     if (
//       email !== process.env.ADMIN_EMAIL ||
//       password !== process.env.ADMIN_PASSWORD
//     ) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 3.Find user by email
//     const user = await User.findOne({ email }).select("+password"); // Include password field for comparison

//     // 4.If user not found or password is incorrect or user is not admin
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = user.generateAuthToken(user.email + user.password);

//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     console.error("Admin login error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export { loginUser, registerUser, loginAdmin };
