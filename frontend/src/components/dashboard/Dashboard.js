import React, { useState } from "react";
import TopRegion from "./TopRegion";
import TopTags from "./TopTags";
import TopTrendingChannels from "./TopTrendingChannels";
import TopUsers from "./TopUsers";

const Dashboard = () => {
  const [dateGTE, setDateGTE] = useState("2020-11-10T00:00:00.454+00:00");
  const [dateLT, setDateLT] = useState("2026-11-12T00:00:00.454+00:00");

  console.log(dateGTE);
  console.log(dateLT);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <label htmlFor="gte">From:</label>
      <input
        type="date"
        id="gte"
        name="gte"
        onChange={(e) => setDateGTE(e.target.value + "T00:00:00.454+00:00")}
      />
      <label htmlFor="lt">To:</label>
      <input
        type="date"
        id="lt"
        name="lt"
        onChange={(e) => setDateLT(e.target.value + "T00:00:00.454+00:00")}
      />
      <div style={{ display: "flex" }}>
        <TopTrendingChannels lt={dateLT} gte={dateGTE} />
        <TopUsers />
        <TopRegion />
        <TopTags lt={dateLT} gte={dateGTE} />
      </div>
    </div>
  );
};

export default Dashboard;
