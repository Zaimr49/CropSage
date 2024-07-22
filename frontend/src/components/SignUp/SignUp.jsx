import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SignUpForm() {
  const [state, setState] = React.useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const navigate = useNavigate();


  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { username, email, password } = state;

    try {
      const response = await axios.post("https://crop-sage-backend.vercel.app/api/auth/signup", { username, email, password });
      alert(`Signup successful! Token: ${response.data.token}`);
      // Save the token or user data in localStorage/sessionStorage if needed
      localStorage.setItem('authToken', response.data.token);
      navigate("/home"); // Redirect to homepage
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
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
