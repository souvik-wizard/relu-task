import React from "react";
import { GoDotFill } from "react-icons/go";

const rightSidebarData = [
  {
    name: "Thomas Edward",
    username: "@thewillwithyou",
    image: "/assets/rightsidebar/bg1.png",
    innerImage: "/assets/rightsidebar/bg1-inner.png",
  },
  {
    name: "Chris Doe",
    username: "@thewillwithyou",
    image: "/assets/rightsidebar/bg2.png",
    innerImage: "/assets/rightsidebar/bg2-inner.png",
  },
  {
    name: "Emilie Jones",
    username: "@thewillwithyou",
    image: "/assets/rightsidebar/bg3.png",
    innerImage: "/assets/rightsidebar/bg3-inner.png",
  },
  {
    name: "Jessica Williams",
    username: "@thewillwithyou",
    image: "/assets/rightsidebar/bg4.png",
    innerImage: "/assets/rightsidebar/bg4-inner.png",
  },
];

const RightSideBar = () => {
  return (
    <div className="px-1 w-full md:w-auto flex flex-col h-screen ">
      <div className="flex items-center w-full p-2 md:p-4 pt-0">
        <button className=" w-full  bg-[#88C2BB] text-white px-4 py-3 hover:bg-[#81b8b2] rounded-[10px] lg:px-20 lg:py-8 lg:text-base text-sm md:whitespace-pre">
          Become a Seller
        </button>
      </div>
      <div className="flex gap-4 py-4">
        <p className="cursor-pointer">Artists</p>
        <p className="text-[#8D8D8D] cursor-pointer">Photographers</p>
      </div>
      <div className="overflow-auto overflow-x-hidden thin-scrollbar">
        <div className="relative">
          {rightSidebarData.map((item) => (
            <div
              key={item.name}
              className="flex items-center space-x-3 rounded-[10px] p-2"
            >
              <img
                src={item.image}
                alt="background"
                className="full object-cover "
              />
              <div className="absolute flex items-center gap-2 justify-between translate-y-12">
                <img src={item.innerImage} alt={item.name} className="w-12 " />
                <GoDotFill className="text-[#0EC297] absolute bg-white rounded-full left-9 -top-1" />
                <div className="text-white">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm">{item.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[10px] text-[#8D8D8D] flex justify-around py-2">
        <p className="hover:text-black cursor-pointer">Privacy</p>
        <p className="hover:text-black cursor-pointer">Terms of Service</p>
        <p className="hover:text-black cursor-pointer">Cookie Notice</p>
      </div>
    </div>
  );
};

export default RightSideBar;
