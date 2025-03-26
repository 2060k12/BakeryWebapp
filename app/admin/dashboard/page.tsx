import React from "react";

const page = () => {
  return (
    <div className="grid grid-rows-3">
      {/* Define grid and rows */}
      <div className="flex flex-col bg-black text-white font-bold text-xl">
        <ul className="p-4 space-y-4">
          <li>Home</li>
          <li>Settings</li>
          <li>Edit</li>
          <li>Offers/ Promotion</li>
          <li>Upload</li>
        </ul>
      </div>
      <div className="bg-white">Hello World</div>
    </div>
  );
};

export default page;
