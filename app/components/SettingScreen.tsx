import React from "react";

const SettingScreen = () => {
  return (
    <div className="flex-col m-4 space-y-2">
      <button className="text-xl bg-black text-white w-full px-4 py-2 rounded-sm text-left hover:cursor-pointer hover:bg-gray-900">
        Set Store Currency
      </button>
      <button className="text-xl bg-black text-white w-full px-4 py-2 rounded-sm text-left hover:cursor-pointer hover:bg-gray-900">
        Change Website Theme
      </button>
      <button className="text-xl bg-black text-white w-full px-4 py-2 rounded-sm text-left hover:cursor-pointer hover:bg-gray-900">
        Privacy & Security
      </button>

      <button className="text-xl bg-black text-white w-full px-4 py-2 rounded-sm text-left hover:cursor-pointer hover:bg-gray-900">
        Edit Business Details
      </button>

      <button className="text-xl bg-black text-white w-full px-4 py-2 rounded-sm text-left hover:cursor-pointer hover:bg-gray-900">
        Edit Social Media Info
      </button>
    </div>
  );
};

export default SettingScreen;
