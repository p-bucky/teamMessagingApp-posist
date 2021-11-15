import express from "express";
const router = express.Router();

import {
  createChannel,
  allChannel,
  getSingleChannel,
} from "../controllers/channelController.js";

router.post("/create/channel", createChannel);
router.get("/channels", allChannel);
router.get("/channel/single/:channelId", getSingleChannel);

export default router;
