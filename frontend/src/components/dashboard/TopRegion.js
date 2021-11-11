import React, { useEffect, useState } from "react";
import axios from "axios";

const TopRegion = () => {
  const [topRegions, setTopRegions] = useState([]);
  const topRegion = async () => {
    const { data } = await axios.get("/api/v1/top/region");
    setTopRegions(data.message);
    console.log(topRegions);
  };
  useEffect(() => {
    topRegion();
  }, []);
  return (
    <div>
      <h6>Top Trending Regions</h6>
      <ul className="list-group" style={{ width: "200px" }}>
        {topRegions
          ? topRegions.map((tr, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {tr._id}
                <span>{tr.num}</span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TopRegion;
