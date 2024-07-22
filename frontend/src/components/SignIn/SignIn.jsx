import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
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

    const { email, password } = state;

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", { email, password });
      alert(`Login successful! Token: ${response.data.token}`);
      
      // Save the token or user data in localStorage/sessionStorage if needed
      localStorage.setItem('authToken', response.data.token);
      navigate("/home"); // Redirect to homepage
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Login failed. Please check your credentials.");
    }

    setState({
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
