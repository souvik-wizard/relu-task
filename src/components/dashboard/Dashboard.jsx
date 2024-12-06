import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import { FaHeart } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Post Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="/placeholder.svg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">Lara Leones</h3>
                    <p className="text-sm text-gray-500">@thewallart</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-500">
                  <FaHeart className="h-5 w-5" />
                </button>
              </div>
              <p className="mb-4">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <img
                src="/placeholder.svg"
                alt="Post content"
                className="rounded-lg w-full object-cover mb-4"
              />
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-400 hover:text-red-500">
                  <FaHeart className="h-5 w-5 mr-1" />
                  9.8k
                </button>
                <button className="flex items-center text-gray-400 hover:text-blue-500">
                  <FaHeart className="h-5 w-5 mr-1" />
                  8.6k
                </button>
                <button className="flex items-center text-gray-400 hover:text-green-500">
                  <FaHeart className="h-5 w-5 mr-1" />
                  7.2k
                </button>
              </div>
            </div>
          </div>
        </main>
        {/* Right Sidebar */}
        <div className="w-80 p-6 border-l bg-white">
          <h2 className="font-semibold mb-4">Suggested Artists</h2>
          <div className="space-y-4">
            {[
              "Thomas Edward",
              "Chris Doe",
              "Emilie Jones",
              "Jessica Williams",
            ].map((name) => (
              <div key={name} className="flex items-center space-x-3">
                <img
                  src="/placeholder.svg"
                  alt={name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">@thewillwithyou</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
