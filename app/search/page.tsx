"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="my-16 justify-center mx-auto w-3/4 ">
      <div className="flex justify-center gap-8 ">
        {/* Search Text bar */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border p-2 rounded-2xl w-full  px-4 py-4 text-xl "
          placeholder="Search Here"
        />
        {/* Filter Icon */}
        <IoFilter className="text-5xl" />
      </div>

      <div>
        {/* Title  */}
        <h2 className="text-2xl mt-4 p-2 font-bold">Categories</h2>

        {/* All Options */}
        <div className="flex">
          <h2 className="text-xl  px-2 hover:cursor-pointer hover:underline">
            Anniversary
          </h2>
          <h2 className="text-xl  px-2 hover:cursor-pointer hover:underline">
            Birthday
          </h2>
          <h2 className="text-xl  px-2 hover:cursor-pointer hover:underline">
            Wedding
          </h2>
          <h2 className="text-xl  px-2 hover:cursor-pointer hover:underline">
            Events
          </h2>
          <h2 className="text-xl  px-2 hover:cursor-pointer hover:underline">
            Pastery
          </h2>
          <h2 className="text-xl  px-2 hover:cursor-pointer hover:underline">
            Breads
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Search;
