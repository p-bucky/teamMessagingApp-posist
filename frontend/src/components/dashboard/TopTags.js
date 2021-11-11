import React, { useEffect, useState } from "react";
import axios from "axios";

const TopTags = () => {
  const [topTags, setTopTags] = useState([]);
  const toptag = async () => {
    const { data } = await axios.get("/api/v1/top/tags");
    setTopTags(data.message);
    console.log(topTags);
  };
  useEffect(() => {
    toptag();
  }, []);
  return (
    <div>
      <h6>Top Tags</h6>
      <ul className="list-group" style={{ width: "200px" }}>
        {topTags
          ? topTags.map((tg, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tg._id}
                <span>{tg.count}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopTags;
