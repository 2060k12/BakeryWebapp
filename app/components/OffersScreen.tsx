"use client";
import Image from "next/image";
import React, { useState } from "react";
import BannerDetailView from "./BannerDetailView";

const OffersScreen = () => {
  const [detailView, setDetailView] = useState(false);
  const [openAddPromotion, setOpenAddPromotion] = useState(false);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-white bg-black p-4">
          Current Banner Promotion
        </h1>
        <div className="flex">
          <Image
            onClick={() => setDetailView(true)}
            src={"/images/cake1.jpg"}
            width={300}
            height={400}
            alt="ad Image"
            className="rounded-2xl m-4 hover:cursor-pointer"
          />
          <Image
            onClick={() => setDetailView(true)}
            src={"/images/ad.jpg"}
            width={300}
            height={400}
            alt="ad Image"
            className="rounded-2xl m-4 hover:cursor-pointer"
          />
        </div>
        <button className="text-2xl font-bold text-white bg-green-400 w-10/11 py-4 m-8 rounded-xl hover:cursor-pointer">
          Add New Promotion
        </button>
      </div>
      {detailView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <button
              className="hover:cursor-pointer text-right w-full mb-4 text-red-700 text-2xl"
              onClick={() => setDetailView(false)}
            >
              back
            </button>
            <BannerDetailView />
          </div>
        </div>
      )}
    </>
  );
};

export default OffersScreen;
