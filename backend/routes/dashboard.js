import express from "express";
const router = express.Router();

import {
  topTrendingChannel,
  topUsers,
  topTrendingRegions,
  topTrendingTags,
} from "../controllers/dashboardController.js";

router.get("/top/channels/:gte/:lt", topTrendingChannel);
router.get("/top/users", topUsers);
router.get("/top/region", topTrendingRegions);
router.get("/top/tags", topTrendingTags);

export default router;
