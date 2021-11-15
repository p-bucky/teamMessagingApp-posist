import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import Posts from "../post/Posts";
import ChannelInfo from "./ChannelInfo";

const SingleChannel = () => {
  const [channelInfo, setChannelInfo] = useState();
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  const channelId = location.pathname.split("/")[2];

  const channelData = async (channelId) => {
    try {
      const { data } = await axios.get(`/api/v1/channel/single/${channelId}`);
      setChannelInfo(data.channel);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (channelId) => {
    try {
      const { data } = await axios.get(`/api/v1/posts/${channelId}`);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(posts);

  useEffect(() => {
    channelData(channelId);
    postData(channelId);
  }, [channelId]);

  return (
    <div className="container" style={{ display: "flex" }}>
      <div>
        <ChannelInfo channelInfo={channelInfo} />
      </div>
      <div style={{ marginLeft: "5px" }}>
        <CreatePost setPosts={setPosts} posts={posts} />
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default SingleChannel;
