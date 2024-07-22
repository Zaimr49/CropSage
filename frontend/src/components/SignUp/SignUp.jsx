
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import "./SignUp.css";
function SignUpForm() {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: ""
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    const { username, email, password } = state;

    try {
      const response = await axios.post("https://crop-sage-backend.vercel.app/api/auth/signup", { username, email, password });
      alert(`Signup successful! Token: ${response.data.token}`);
      localStorage.setItem('authToken', response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("There was an error signing up!", error);
      alert("Signup failed. Please try again.");
    }

    setState({
      username: "",
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
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
}

export default SignUpForm;
