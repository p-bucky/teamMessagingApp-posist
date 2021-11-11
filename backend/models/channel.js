import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  invitedUser: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postCount: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
  },
});

const Channel = mongoose.model("channels", channelSchema);
export default Channel;
