// import React from "react";
// import { IoIosSearch } from "react-icons/io";
// import { Link } from "react-router-dom";

// export function Sidebar() {
//   return (
//     <div className="w-64 h-screen border-r bg-white p-4 flex flex-col">
//       <div className="flex-1 space-y-2">
//         <Link
//           to="/dashboard"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>Home</span>
//         </Link>
//         <Link
//           to="/notifications"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>Notifications</span>
//         </Link>
//         <Link
//           to="/shop"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>Shop</span>
//         </Link>
//         <Link
//           to="/conversation"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>Conversation</span>
//         </Link>
//         <Link
//           to="/wallet"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>Wallet</span>
//         </Link>
//         <Link
//           to="/profile"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>My Profile</span>
//         </Link>
//         <Link
//           to="/settings"
//           className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
//         >
//           <IoIosSearch className="h-5 w-5" />
//           <span>Settings</span>
//         </Link>
//       </div>
//       <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg text-red-500">
//         <IoIosSearch className="h-5 w-5" />
//         <span>Log out</span>
//       </button>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

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

  return (
    <div
      className={`${
        isSmallScreen ? (isExpanded ? "w-60" : "w-20") : "w-60"
      } relative flex flex-col justify-between h-screen bg-white text-gray-800 p-4 pt-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)] rounded-[20px] transition-all duration-300 
       `}
    >
      {isSmallScreen && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-10 bg-white rounded-full p-1.5 shadow-lg z-50"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <div className="w-4 h-4 border-2 border-gray-600 rounded-full " />
        </button>
      )}
      <div>
        <div className="flex gap-x-4 items-center justify-center">
          <img src="/logo.png" alt="Logo" width={120} height={40} />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center text-sm gap-3.5 p-2 rounded-[10px] cursor-pointer ${
                item.isActive
                  ? "bg-[#E9EFFF] text-blue-600 font-medium"
                  : "hover:bg-[#E9EFFF] text-[#4d4d4d]"
              }`}
              role="button"
              tabIndex={0}
              aria-label={item.label}
              aria-current={item.isActive ? "page" : undefined}
            >
              <div
                className={item.isActive ? "text-blue-600" : "text-[#4d4d4d]"}
              >
                <img src={item.icon} alt={item.label} width={20} height={20} />
              </div>
              {(!isSmallScreen || isExpanded) && (
                <h2 className="whitespace-pre">{item.label}</h2>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:border-t border-gray-200 py-4 bg-inherit">
        <div className="flex flex-col items-start gap-2 p-2 rounded-md">
          <div
            className={`flex items-center text-sm gap-3.5 p-2 rounded-[10px] cursor-pointer `}
            role="button"
            aria-label="logout"
          >
            <div className="">
              <img
                src="assets/icons/logout.svg"
                alt="logout"
                width={18}
                height={18}
              />
            </div>
            {(!isSmallScreen || isExpanded) && (
              <h2 className="whitespace-pre">Logout</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
