import mongoose from "mongoose";

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
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide user password"],
      minlength: [6, "Password should be at least 6 characters long"],
    },
    cartData: {
      type: object,
      default: {},
    },
    date: {
      type: Date,
      default: Date.now,
    },
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
  },
  { minimize: false, timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
