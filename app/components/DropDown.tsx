"use client";

import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block  w-full ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
      >
        Diatery Options
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-black border rounded-md shadow-lg">
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Vegeterian - Contains Eggs
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Vegan - No Daity/Eggs
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
            Notmal
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
