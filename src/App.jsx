import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
