import Post from "../models/post.js";
import Channel from "../models/channel.js";
import User from "../models/user.js";

// Create a post   => /api/v1/post/:channelId/:userId
export const createPost = async (req, res) => {
  try {
    const { userId, message, channelId } = req.body;

    const cid = req.params.channelId;
    const uid = req.params.userId;
    const channel = await Channel.findById(cid);
    const user = await User.findById(uid);
    await Channel.findByIdAndUpdate(
      { _id: cid },
      { postCount: channel.postCount + 1, updatedAt: new Date() },
      { new: true, useFindAndModify: false }
    );
    await User.findByIdAndUpdate(
      { _id: uid },
      { postCount: user.postCount + 1 },
      { new: true, useFindAndModify: false }
    );

    const post = await Post.create({
      user_id: userId,
      message,
      channel_id: channelId,
    });
    res.status(200).json({
      success: true,
      message: post,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Get All Post   => /api/v1/post/:channel_id/:uid
export const allPost = async (req, res) => {
  try {
    const posts = await Post.find({ channel_id: req.params.channelId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};
