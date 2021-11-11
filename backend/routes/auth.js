import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  singleUser,
  logout,
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/user/:id", singleUser);

export default router;
