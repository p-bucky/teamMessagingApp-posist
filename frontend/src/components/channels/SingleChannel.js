import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CreatePost from "../post/CreatePost";
import AllPosts from "../post/AllPosts";

const SingleChannel = () => {
  const [currentChannelData, setCurrentChannelData] = useState();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const channelData = async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/channel/single/${id}`);
      setCurrentChannelData(data.channel);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    channelData(id);
  }, [id]);
  return (
    <div className="container" style={{ display: "flex" }}>
      <div>
        {currentChannelData ? (
          <>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{currentChannelData.name}</h5>
                <div style={{ display: "flex" }}>
                  {currentChannelData.tags.map((ct, i) => (
                    <h6
                      style={{ marginRight: "5px" }}
                      key={i}
                      className="card-subtitle mb-2 text-muted"
                    >
                      {ct}
                    </h6>
                  ))}
                </div>

                <p className="card-text">{currentChannelData.description}</p>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Invited Users
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {currentChannelData.invitedUser.map((iu, i) => (
                      <li key={i}>{iu}</li>
                    ))}
                  </ul>
                </div>
                <h6
                  style={{ marginTop: "5px" }}
                  className="card-subtitle mb-2 text-muted"
                >
                  {currentChannelData.createdAt}
                </h6>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div style={{ marginLeft: "5px" }}>
        <CreatePost />
        <AllPosts channelId={id} />
      </div>
    </div>
  );
};

export default SingleChannel;
