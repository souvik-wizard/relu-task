import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import Sidebar from "./Sidebar";
import Search from "./Search";
import SocialCard from "./SocialCard";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Posts");
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!user && !storedUser) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex gap-0 md:gap-4  w-full">
      <Sidebar />
      <div className="hidden xl:flex flex-col md:flex-row w-full gap-0 md:gap-4 h-screen ">
        <Feed />
        <RightSideBar />
      </div>

      <div className="h-screen w-full xl:hidden flex flex-col overflow-auto pr-2">
        <div className="sticky top-0 z-10 bg-inherit p-2 md:p-4 ">
          <Search />
        </div>

        <div className="sticky top-[60px] z-10 bg-inherit flex justify-around items-center w-full p-2 md:p-4 ">
          <button
            className={`p-2 md:p-3 ${
              selectedTab === "Posts"
                ? "text-[#88C2BB] font-bold underline"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Posts")}
          >
            Posts
          </button>
          <button
            className={`p-2 md:p-3 ${
              selectedTab === "Feed"
                ? "text-[#85c8c0] font-bold underline"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Feed")}
          >
            Feed
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {selectedTab === "Posts" ? <SocialCard /> : <RightSideBar />}
        </div>
      </div>
    </div>
  );
}
