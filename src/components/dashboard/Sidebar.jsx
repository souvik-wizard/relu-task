import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { auth } from "../../firebase/firebase";

const menuItems = [
  { id: 1, label: "Home", icon: "assets/icons/home.svg", isActive: true },
  {
    id: 2,
    label: "Notifications",
    icon: "assets/icons/notification.svg",
    isActive: false,
  },
  {
    id: 3,
    label: "Shop",
    icon: "assets/icons/heart.svg",
    isActive: false,
  },
  {
    id: 4,
    label: "Conversation",
    icon: "assets/icons/message.svg",
    isActive: false,
  },
  {
    id: 5,
    label: "Wallet",
    icon: "assets/icons/wallet.svg",
    isActive: false,
  },
  {
    id: 6,
    label: "Subscription",
    icon: "assets/icons/favorite.svg",
    isActive: false,
  },
  {
    id: 7,
    label: "My Profile",
    icon: "assets/icons/profile.svg",
    isActive: false,
  },
  {
    id: 8,
    label: "Settings",
    icon: "assets/icons/setting.svg",
    isActive: false,
  },
];
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  function useScreenSize() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 1024);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return isSmallScreen;
  }

  const isSmallScreen = useScreenSize();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

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
    <div
      className={`${
        isSmallScreen ? (isExpanded ? "w-44" : "w-24") : "w-72"
      } relative flex flex-col justify-between h-screen text-gray-800 p-2 md:p-4 transition-all duration-300 z-50 
       `}
    >
      {isSmallScreen && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-2 top-10 bg-white rounded-full p-1.5 shadow-lg z-50"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <div className="w-4 h-4 border-2 border-gray-600 rounded-full " />
        </button>
      )}
      <div className="h-full flex flex-col justify-between">
        <div className=" bg-white rounded-[10px] py-4 px-2 lg:p-8 ">
          <img src="assets/logo.png" alt="Logo" className="w-20 lg:w-24" />
        </div>

        <div className="mt-2 lg:mt-8 flex justify-between flex-col  bg-white rounded-[10px] h-full p-4">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`relative flex items-center text-sm gap-3.5 p-2 rounded-[10px] cursor-pointer ${
                  item.isActive
                    ? " font-medium"
                    : "hover:bg-[#88C2BB]/10 text-[#4d4d4d]"
                }`}
                role="button"
                tabIndex={0}
                aria-label={item.label}
                aria-current={item.isActive ? "page" : undefined}
              >
                {item.isActive && (
                  <div className="absolute -left-4 h-full w-1 bg-[#88C2BB] " />
                )}
                <div
                  className={`w-4 h-4 ${
                    item.isActive ? "text-[#4d4d4d]" : "text-[#000000]"
                  }`}
                >
                  <img src={item.icon} alt={item.label} className="" />
                </div>
                {(!isSmallScreen || isExpanded) && (
                  <h2 className="whitespace-pre">{item.label}</h2>
                )}
              </div>
            ))}
          </div>
          <div
            className={`flex  items-center text-sm gap-3.5 p-2 rounded-[10px] cursor-pointer hover:bg-[#88C2BB]/10 w-full`}
            role="button"
            aria-label="logout"
            onClick={handleLogout}
          >
            <div className="">
              <img src="assets/icons/logout.svg" alt="logout" className="" />
            </div>
            {(!isSmallScreen || isExpanded) && (
              <h2 className=" text-[#88c2bb]">Log out</h2>
            )}
          </div>
        </div>
      </div>
      {(!isSmallScreen || isExpanded) && (
        <div className="flex py-2 px-1 text-[10px] flex-col lg:flex-row justify-between text-[#8D8D8D]">
          <p>2022©logo name</p>
          <p>Developed by ivan Infotech</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
