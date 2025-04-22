"use client";

import { DietaryOption, Item } from "@/db/models/ItemModel";
import Image from "next/image";
import React from "react";

const EachCartItem = ({ order }: { order: Item }) => {
  return (
    <div>
      <div className="grid grid-cols-6">
        <Image
          className="col-span-1 rounded-xl md:h-25 md:w-25   h-18 w-18"
          src={order.itemImage ? order.itemImage : "/images/cake1.jpg"}
          height={150}
          width={150}
          alt="Cake"
        />

        <div className="col-span-2 md:px-0 px-2">
          <h3 className=" md:text-xl text-lg">{order.name}</h3>
          <h3 className="font-bold">{order.category.name}</h3>
        </div>

        {/* Quantity */}
        <div className="flex flex-col  col-span-2 mx-auto">
          <h1>
            {order.dietaryOption === DietaryOption.VEGAN ? (
              <span className="text-green-500">Vegan</span>
            ) : order.dietaryOption === DietaryOption.DAIRY_FREE ? (
              <span className="text-blue-500">Dairy Free</span>
            ) : order.dietaryOption ===
              DietaryOption.VEGETARIAN_CONTAINS_EGG ? (
              <span className="text-yellow-500">Vegetarian (contains egg)</span>
            ) : order.dietaryOption === DietaryOption.All_OPTIONS ? (
              <span className="text-gray-500">All Options</span>
            ) : null}
          </h1>

          {order.dietaryOption === DietaryOption.All_OPTIONS && (
            <select
              className="border border-gray-300 rounded px-2 py-1"
              onChange={(e) =>
                (order.dietaryOption = e.target.value as DietaryOption)
              }
            >
              <option value="">Select an option</option>
              <option value={DietaryOption.VEGAN}>Vegan</option>
              <option value={DietaryOption.DAIRY_FREE}>Dairy Free</option>
              <option value={DietaryOption.VEGETARIAN_CONTAINS_EGG}>
                Vegetarian (contains egg)
              </option>
            </select>
          )}
        </div>

        {/* price */}
        <h3 className="text-right">${order.price}</h3>
      </div>
    </div>
  );
};

export default EachCartItem;
