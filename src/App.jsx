import React from "react";
import {
  Route,
  Navigate,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ErrorPage from "./components/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
