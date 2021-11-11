import Channel from "../models/channel.js";
import User from "../models/user.js";

// Top Trending Channel =>  /api/v1/top/channels/:gte/:lt
export const topTrendingChannel = async (req, res) => {
  try {
    const channel = await Channel.find({
      updatedAt: {
        $gte: new Date(req.params.gte),
        $lt: new Date(req.params.lt),
      },
    })
      .sort({ postCount: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: channel,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Top users =>  /api/v1/top/users
export const topUsers = async (req, res) => {
  try {
    const user = await User.find().sort({ postCount: -1 }).limit(5);

    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Top Trending Regions =>  /api/v1/top/region
export const topTrendingRegions = async (req, res) => {
  try {
    const topRegion = await User.aggregate([
      { $group: { _id: "$region", num: { $sum: 1 } } },
    ])
      .sort({ num: -1 })
      .limit(5);
    res.status(200).json({
      success: true,
      message: topRegion,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Top Trending Tags => /api/v1/top/tags
export const topTrendingTags = async (req, res) => {
  try {
    const topTags = await Channel.aggregate([
      { $unwind: "$tags" },
      { $sortByCount: "$tags" },
    ]).limit(5);

    res.status(200).json({
      success: true,
      message: topTags,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};
