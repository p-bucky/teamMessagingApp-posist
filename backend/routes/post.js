import express from "express";
const router = express.Router();

import { createPost, allPost } from "../controllers/postController.js";

router.post("/create/post/:channelId/:userId", createPost);
router.get("/posts/:channelId", allPost);

export default router;
