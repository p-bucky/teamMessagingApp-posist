import React from "react";

const ChannelInfo = ({ channelInfo }) => {
  return (
    <>
      {channelInfo ? (
        <>
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{channelInfo.name}</h5>
              <div style={{ display: "flex" }}>
                {channelInfo.tags.map((ct, i) => (
                  <h6
                    style={{ marginRight: "5px" }}
                    key={i}
                    className="card-subtitle mb-2 text-muted"
                  >
                    {ct}
                  </h6>
                ))}
              </div>

              <p className="card-text">{channelInfo.description}</p>
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
                  {channelInfo.invitedUser.map((iu, i) => (
                    <li key={i}>{iu}</li>
                  ))}
                </ul>
              </div>
              <h6
                style={{ marginTop: "5px" }}
                className="card-subtitle mb-2 text-muted"
              >
                {channelInfo.createdAt}
              </h6>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ChannelInfo;
