import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please Enter Your Username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    select: false,
  },
  region: {
    type: String,
    reuqired: [true, "Please Enter The Region"],
  },
  postCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

const User = mongoose.model("users", userSchema);
export default User;
