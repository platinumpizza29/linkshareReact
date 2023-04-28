import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Input, Button } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export default function LoginPage() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //initialize variables
  const cookie = new Cookies();
  const navigate = useNavigate();

  //method
  const handleLogin = async () => {
    const url = "http://192.168.1.137:4000/auth/login";
    try {
      var response = await axios.post(url, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const decoded = jwt(response.data);

        cookie.set("auth-token", response.data, {
          expires: new Date(decoded.exp * 1000),
        });
        navigate("/", { state: decoded });
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  return (
    <div className="LoginPage">
      <div className="parentDiv">
        <div className="firstDiv">
          <h2>Link Share</h2>
          <div className="heading">
            <h1>Start Your Journey</h1>
            <h1>With Us.</h1>
            <p>Discover the world's best community of linksharer's</p>
          </div>
        </div>
        <div className="secondDiv">
          <div className="formLogin">
            <h1>Sign In</h1>
            <div className="inputs">
              <label htmlFor="email">Email</label>
              <Input
                size="large"
                placeholder="Email"
                className="email"
                id="email"
                onChange={(value) => setEmail(value.target.value)}
              />
              <label htmlFor="email">Password</label>
              <Input
                size="large"
                placeholder="Password"
                className="password"
                onChange={(value) => setPassword(value.target.value)}
              />
            </div>
            <Button
              type="primary"
              block
              className="loginButton"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
