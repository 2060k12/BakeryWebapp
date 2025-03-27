import Image from "next/image";
import React from "react";

const OffersScreen = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white bg-black p-4">
        Current Banner Promotion
      </h1>
      <div className="flex">
        <Image
          src={"/images/cake1.jpg"}
          width={300}
          height={400}
          alt="ad Image"
          className="rounded-2xl m-4"
        />
        <Image
          src={"/images/ad.jpg"}
          width={300}
          height={400}
          alt="ad Image"
          className="rounded-2xl m-4"
        />
      </div>
      <button className="text-2xl font-bold text-white bg-green-400 w-10/11 py-4 m-8 rounded-xl hover:cursor-pointer">
        Add New Promotion
      </button>
    </div>
  );
};

export default OffersScreen;
