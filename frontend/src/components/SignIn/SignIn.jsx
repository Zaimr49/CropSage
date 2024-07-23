import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"; // Import using default export
import "./SignIn.css";

const SignInForm = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;

    try {
      console.log(email, password)
      const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      alert(`Login successful! Token: ${response.data.token}`);
      localStorage.setItem('authToken', response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please check your credentials.");
    }

    setState({ email: "", password: "" });
  };

  const handleGoogleLoginSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    try {
      const res = await axios.post("http://localhost:5001/api/auth/googleLogin", { token: response.credential });
      alert(`Login successful! Token: ${res.data.token}`);
      localStorage.setItem('authToken', res.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleLoginError = (error) => {
    console.error("Google login error:", error);
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <GoogleOAuthProvider clientId="767125768562-6g55mtlo8svcj8642fdh4ujbbfq9mls2.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
        <span>or use your account</span>
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
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInForm;
