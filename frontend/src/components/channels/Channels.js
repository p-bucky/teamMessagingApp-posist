import React, { useEffect, useState } from "react";
import CreateChannel from "./CreateChannel";
import Channel from "./Channel";
import axios from "axios";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const getChannels = async () => {
    const { data } = await axios.get("api/v1/channels");
    setChannels(data.channels);
    console.log(data);
  };
  useEffect(() => {
    getChannels();
  }, []);
  return (
    <div className="container">
      <CreateChannel />
      <ul className="list-group">
        {channels
          ? channels.map((channel) => (
              <Channel key={channel._id} data={channel} />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Channels;
