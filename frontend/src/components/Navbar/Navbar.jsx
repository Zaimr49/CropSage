import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo">Crop Sage</div>
      
      <div className="button-container">
        <Button variant="text" color="default" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button variant="text" color="default" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
