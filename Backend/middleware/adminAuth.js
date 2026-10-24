import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // 1. check if the token is provided in the request headers
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // 2. Verify the token and extract the user ID
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if the user is an admin based on the role field in the user model
    const user = await User.findById(token_decoded.id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied. Admins only." });
    }
    next();
  } catch (error) {
    console.error("Admin authentication error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  // If everything is fine, proceed to the next middleware or route handler
};

export default adminAuth;

/*
Approach 2: Config File / Environment Variables
In this approach, credentials are hardcoded into environment variables (.env) instead of checking a database.


const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email matches the config/env variable
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Verify password against the hashed password stored in environment variables
    const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Issue a session or JWT token
    res.json({ message: 'Welcome back, Admin!', token: 'jwt_admin_token_here' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

Code Complexity -Very low (simple conditional string checks).
Adding Multiple Admins -Painful: Requires modifying config files and redeploying code.
Password Updates - Requires manual updates to server environment variables and a restart.
Audit Trails & Logging - Difficult, as all admins share a single static credential.
Maintenance - Good only for isolated, single-owner MVP setups.

*/
