import React from "react";
import { HiAdjustments } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { auth } from "../../firebase/firebase";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Firebase sign out
      dispatch(logout()); // Dispatch logout action to update the Redux state
      localStorage.removeItem("user"); // Remove user data from localStorage
      navigate("/login"); // Navigate to the login page after logout
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold">LOGO</div>
        <div className="flex-1 max-w-2xl mx-4 relative">
          <input
            type="search"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <HiAdjustments className="h-5 w-5" />
          </button>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
      <nav className="container mx-auto px-4 py-2">
        <div className="flex space-x-4">
          <button className="text-blue-600 font-medium">Artists</button>
          <button className="text-gray-600 hover:text-blue-600">
            Photographers
          </button>
        </div>
      </nav>
    </header>
  );
}
