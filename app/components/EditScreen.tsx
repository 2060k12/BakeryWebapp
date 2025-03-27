"use client";
import Image from "next/image";
import React, { useState } from "react";

const EditScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div className="m-4 ">
        <div className="relative inline-block  w-full ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full text-xl hover:cursor-pointer"
          >
            Filter By Category
          </button>

          {isOpen && (
            <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Cakes
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Pastery
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Gifts
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 mx-20 gap-4">
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake6.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center text-xl">Anniversery</h4>
        </div>
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake4.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center">Birthday</h4>
        </div>{" "}
        <div className="flex-row ">
          <Image
            alt="Image for banner"
            src={"/images/cake2.jpg"}
            width={200}
            height={100}
            className="rounded-3xl aspect-square  "
          />
          <h4 className="flex justify-center">Events</h4>
        </div>{" "}
      </div>
    </div>
  );
};

export default EditScreen;
