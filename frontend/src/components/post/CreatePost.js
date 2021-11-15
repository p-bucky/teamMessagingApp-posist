import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

const CreatePost = ({ setPosts, posts }) => {
  const [message, setMessage] = useState("");

  const location = useLocation();
  const channelId = location.pathname.split("/")[2];
  const [cookies] = useCookies();
  let userId = jwt_decode(cookies.token);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `/api/v1/create/post/${channelId}/${userId.id}`,
        {
          message,
          channelId,
          userId: userId.id,
        }
      );
      setMessage("");
      setPosts([data.message, ...posts]);
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
        Create Post
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
                Create Post
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
                    id="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
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

export default CreatePost;
