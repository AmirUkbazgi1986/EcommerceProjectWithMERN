import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide user name"],
      trim: true,
      maxlength: [50, "User name should not be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide user email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please provide a valid email",
      // ],
    },
    password: {
      type: String,
      required: [true, "Please provide user password"],
      minlength: [6, "Password should be at least 6 characters long"],
      select: false, // Do not return password field by default
    },
    cartData: {
      type: Object,
      default: {},
    },
    date: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { minimize: false, timestamps: true },
);

userSchema.pre("save", async function () {
  // Only run this function if password was actually modified
  // if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  // this.password = await bcrypt.genSalt(12).then((salt) => bcrypt.hash(this.password, salt));

  this.password = await bcrypt.hash(this.password, 12);

  // next();
});
// Add these methods to the User schema
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Assuming you have a method to compare passwords, e.g., using bcrypt
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.generateAuthToken = function () {
  // Assuming you have a method to generate JWT tokens
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
