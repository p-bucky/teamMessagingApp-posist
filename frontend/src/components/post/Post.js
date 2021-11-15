import React, { useEffect, useState } from "react";
import axios from "axios";

const AllPost = ({ post }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const postUser = async () => {
      const { data } = await axios.get(`/api/v1/user/${post.user_id}`);
      setUser(data.user);
    };
    postUser();
  }, [post.user_id]);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold"> {user && user.emailId}</div>
        <p>{post.message}</p>
      </div>
    </li>
  );
};

export default AllPost;
