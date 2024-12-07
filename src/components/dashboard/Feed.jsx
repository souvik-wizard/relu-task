import React from "react";
import SocialCard from "./SocialCard";
import Search from "./Search";

export function Feed() {
  return (
    <header className="w-full h-screen">
      <div className="container mx-auto p-2 md:p-4 pt-8 flex flex-col items-center justify-between w-full gap-8 h-screen">
        <Search />
        <SocialCard />
      </div>
    </header>
  );
}

export default Feed;
