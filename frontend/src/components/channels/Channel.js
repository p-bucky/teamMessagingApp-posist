import React from "react";
import { Link } from "react-router-dom";

const Channel = ({ data }) => {
  return (
    <>
      <Link style={{ textDecoration: "none" }} to={`/channel/${data._id}`}>
        <li className="list-group-item" style={{ margin: "10px" }}>
          {data.name}
        </li>
      </Link>
    </>
  );
};

export default Channel;
