import Image from "next/image";
import React from "react";

const BannerDetailView = () => {
  return (
    <div>
      <div className="grid grid-cols-2">
        <Image
          src={"/images/cake1.jpg"}
          width={300}
          height={400}
          alt="ad Image"
          className="rounded-2xl m-4 hover:cursor-pointer"
        />
        <div className="  m-4 ">
          <h3>Promo Code</h3>
          <div className="flex justify-between gap-2 mb-4 ">
            <input
              type="text"
              placeholder="Create a code"
              className="py-2 px-4 rounded-sm border-2 border-black w-full"
            />
            <button className="bg-green-600 text-white py-2 px-4 rounded-sm">
              Check
            </button>
          </div>
          <button className="p-4 text-xl bg-red-700 text-white w-full rounded-sm hover:cursor-pointer hover:bg-red-500">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerDetailView;
