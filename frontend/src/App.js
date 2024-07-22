import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./styles.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import NavBar from "./components/Navbar/Navbar";

export default function App() {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  const showNavBar = token && location.pathname !== "/" && location.pathname !== "*";

  return (
    <div className="App">
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/home"
          element={token ? <HomePage /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
