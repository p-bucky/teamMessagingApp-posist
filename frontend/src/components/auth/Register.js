import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./auth.css";

const Register = () => {
  const [emailId, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.token) {
      navigate("/home");
    }
  }, [navigate, cookies.token]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/v1/register",
        {
          emailId,
          username,
          password,
          region,
        },
        config
      );
      console.log(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth text-center">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Email Id</label>
          </div>
          <div className="form-floating">
            <input
              type="username"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="region"
              className="form-control"
              id="floatingInput"
              placeholder="Region"
              onChange={(e) => {
                setRegion(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Region</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <Link to="/login">Login From Here</Link>

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
