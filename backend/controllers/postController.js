import Post from "../models/post.js";
import Channel from "../models/channel.js";
import User from "../models/user.js";

// Create a post   => /api/v1/post/:channel_id/:uid
export const createPost = async (req, res) => {
  try {
    const { user_id, message, channel_id } = req.body;
    const id = req.params.channel_id;
    const uid = req.params.uid;

    const channel = await Channel.findById(id);
    const updatedChannel = await Channel.findByIdAndUpdate(
      { _id: id },
      { postCount: channel.postCount + 1, updatedAt: new Date() },
      { new: true, useFindAndModify: false }
    );
    const user = await User.findById(uid);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: uid },
      { postCount: user.postCount + 1 },
      { new: true, useFindAndModify: false }
    );
    const post = await Post.create({
      user_id,
      message,
      channel_id,
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
    const posts = await Post.find({ channel_id: req.params.channelId });
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
