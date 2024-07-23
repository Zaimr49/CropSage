import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import "./SignUp.css";

const SignUpForm = () => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { username, email, password } = state;

    try {
      console.log("Attempting to sign up with:", { username, email, password });
      const response = await axios.post("http://localhost:5001/api/auth/signup", { username, email, password });
      alert(`Signup successful! Token: ${response.data.token}`);
      localStorage.setItem('authToken', response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("Signup failed. Please try again.");
    }

    setState({ username: "", email: "", password: "" });
  };

  const handleGoogleLoginSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Google login success. Decoded token:", decoded);
    try {
      const res = await axios.post("http://localhost:5001/api/auth/googleSignup", { token: response.credential });
      console.log("Response from server:", res.data);
      alert(`Signup successful! Token: ${res.data.token}`);
      localStorage.setItem('authToken', res.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Google signup error:", error);
      alert("Google signup failed. Please try again.");
    }
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google signup error:", error);
    alert("Google signup failed. Please try again.");
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <GoogleOAuthProvider clientId="767125768562-6g55mtlo8svcj8642fdh4ujbbfq9mls2.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <div className="password-container">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <span
            className="password-toggle"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
