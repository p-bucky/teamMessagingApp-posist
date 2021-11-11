import React, { useEffect, useState } from "react";
import axios from "axios";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const topUser = async () => {
    const { data } = await axios.get("/api/v1/top/users");
    setTopUsers(data.message);
    console.log(topUsers);
  };
  useEffect(() => {
    topUser();
  }, []);
  return (
    <div>
      <h6>Top Users</h6>
      <ul className="list-group" style={{ width: "200px" }}>
        {topUsers
          ? topUsers.map((tu, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tu.emailId}
                <span>{tu.postCount}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopUsers;
