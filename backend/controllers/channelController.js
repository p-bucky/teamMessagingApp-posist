import Channel from "../models/channel.js";

// Create a Channel   => /api/v1/create/channel
export const createChannel = async (req, res) => {
  try {
    const { name, description, tags, invitedUser } = req.body;

    const channel = await Channel.create({
      name,
      description,
      tags,
      invitedUser,
    });
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

// Get All Channels   => /api/v1/channels
export const allChannel = async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json({
      success: true,
      channels,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

// Get Single channel:  /api/v1/channel/single/:id
export const getSingleChannel = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  if (!channel) {
    res.status(401).json({
      success: false,
      message: "channel Not found",
    });
  }
  res.status(200).json({
    success: true,
    channel,
  });
};
