import React, { useEffect, useState } from "react";
import axios from "axios";
import AllPost from "./AllPost";

const AllPosts = ({ channelId }) => {
  const [posts, setPosts] = useState([]);
  const postData = async () => {
    const { data } = await axios.get(`/api/v1/posts/${channelId}`);
    setPosts(data.posts);
    console.log(data);
  };

  useEffect(() => {
    postData();
  }, [channelId]);
  return (
    <div>
      <ul className="list-group " style={{ width: "300px", marginTop: "10px" }}>
        {posts ? (
          posts.map((post, i) => <AllPost key={i} post={post} />)
        ) : (
          <h1>Loading</h1>
        )}
      </ul>
    </div>
  );
};

export default AllPosts;
