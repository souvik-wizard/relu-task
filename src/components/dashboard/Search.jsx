import React from "react";

const Search = () => {
  return (
    <div className="flex w-full relative bg-white rounded-[10px] items-center p-1 lg:p-6">
      <input
        type="search"
        placeholder="Search here..."
        className="w-full pl-10 pr-4 p-1.5 lg:py-2  focus:outline-none "
      />
      <img
        src="/assets/icons/search.svg"
        alt="Search"
        className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 text-[#303030] w-6 h-6"
      />
      <button className="flex justify-center items-center gap-2 px-4">
        <img src="/assets/icons/filter.svg" alt="Filter" className="w-6" />
        Filters
      </button>
    </div>
  );
};

export default Search;
