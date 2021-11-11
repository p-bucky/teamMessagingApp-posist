import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [name, setChannelName] = useState("");
  const [description, setChannelDesc] = useState("");
  const [channelTags, setChannelTags] = useState("");
  const [channelInvitedUsers, setChannelInvitedUsers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let tags = channelTags.split(",");
    let invitedUser = channelInvitedUsers.split(",");
    try {
      const { data } = await axios.post("/api/v1/create/channel", {
        name,
        description,
        tags,
        invitedUser,
      });
      setChannelInvitedUsers("");
      setChannelName("");
      setChannelTags("");
      setChannelDesc("");
      navigate("/home");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createChannel"
      >
        Create Channel
      </button>

      <div
        className="modal fade"
        id="createChannel"
        tabIndex="-1"
        aria-labelledby="createChannelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createChannelLabel">
                Create Channel
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Channel Name"
                    value={name}
                    onChange={(e) => setChannelName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Channel Description"
                    value={description}
                    onChange={(e) => setChannelDesc(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    placeholder="Channel Tag Example: tag1, tag2, tag3"
                    value={channelTags}
                    onChange={(e) => setChannelTags(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="invitedUsers"
                    placeholder="Invited Users Example: user1@gmail.com, user2@gmail.com"
                    value={channelInvitedUsers}
                    onChange={(e) => setChannelInvitedUsers(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateChannel;
