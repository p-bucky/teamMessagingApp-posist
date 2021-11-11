import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies.token) {
      navigate("/home");
    }
  }, [navigate, cookies.token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/v1/login",
        {
          username,
          password,
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
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>

          <div className="form-floating">
            <input
              type="username"
              className="form-control"
              id="floatingInput"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <Link to="/register">Register From Here</Link>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
