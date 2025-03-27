import React from "react";

const EachDeliveryItem = () => {
  return (
    <div className="  mx-4 bg-gray-300 text-black rounded-sm p-4">
      <div className="flex justify-between">
        <h2>Birthday Cake</h2>
        <h2># 44345</h2>
      </div>
      <div className="flex justify-between">
        <h2>1 xyz street, Campsie, 2194</h2>
        <h2>28 Mar, 2025</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button className="text-xl bg-black-600 border-2 border-black text-black p-2 rounded-sm hover:cursor-pointer  hover:bg-black hover:text-white hover:border-black mt-3 w-full">
          View Details
        </button>
        <button className="text-xl bg-green-600 border-2 border-green-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
          Mark Delivered
        </button>
        <button className="text-xl bg-blue-600 border-2 border-blue-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-blue-500 hover:border-green-500 mt-3 w-full">
          Contact Customer
        </button>
      </div>
    </div>
  );
};

export default EachDeliveryItem;
