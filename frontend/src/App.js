import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage"; // Assuming you have a HomePage component
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
