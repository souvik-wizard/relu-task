import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Feed } from "./Feed";
import RightSideBar from "./RightSideBar";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists in Redux state or localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!user && !storedUser) {
      navigate("/login"); // Redirect to login if no user found
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex gap-0 md:gap-4 bg-[#F5F5F5] w-full">
      <Sidebar />
      <div className="flex flex-col md:flex-row w-full gap-0 md:gap-4 h-screen ">
        <Feed />
        <RightSideBar />
      </div>
    </div>
  );
}
