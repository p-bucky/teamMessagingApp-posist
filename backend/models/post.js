import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  message: {
    type: String,
  },
  channel_id: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Post = mongoose.model("posts", postSchema);
export default Post;
