import React, { useEffect, useState } from "react";
import axios from "axios";

const TopTrendingChannels = ({ gte, lt }) => {
  const [topChannels, setTopChannels] = useState([]);
  const topChannel = async (gte, lt) => {
    const { data } = await axios.get(`/api/v1/top/channels/${gte}/${lt}`);
    setTopChannels(data.message);
    console.log(topChannels);
  };
  useEffect(() => {
    topChannel(gte, lt);
  }, [gte, lt]);
  return (
    <div>
      <h6>Top Trending Channels</h6>
      <ul className="list-group" style={{ width: "200px" }}>
        {topChannels
          ? topChannels.map((tc, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tc.name}
                <span>{tc.postCount}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopTrendingChannels;
