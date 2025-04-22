"use client";

import Image from "next/image";
import React from "react";
import { CustomOrder } from "./CreateYourOwn";
import toast from "react-hot-toast";
const EachCustomCartItem = ({ order }: { order: CustomOrder }) => {
  return (
    <div>
      <div className="grid grid-cols-6">
        <Image
          className="col-span-1 rounded-xl md:h-25 md:w-25   h-18 w-18"
          src={order.itemImage ? order.itemImage : "/images/cake1.jpg"}
          height={200}
          width={200}
          alt="Cake"
        />

        <div className="col-span-2 md:px-0 px-2">
          <h3 className=" md:text-xl text-lg">
            {order.name ?? "Custom Order"}
          </h3>
          <div className="flex flex-row">
            <strong>Message: </strong>

            <h3 className="font-bold">{order.message}</h3>
          </div>
          <div className="flex flex-row col-span-2"></div>

          <button
            onClick={() => {
              const existingOrders: CustomOrder[] = JSON.parse(
                localStorage.getItem("customOrders") || "[]"
              );
              const updatedOrders = existingOrders.filter(
                (item) => item.itemImage !== order.itemImage
              );
              localStorage.setItem(
                "customOrders",
                JSON.stringify(updatedOrders)
              );
              toast.success("Order removed!");
            }}
            className="text-gray-600 text-sm hover:cursor-pointer"
          >
            Remove
          </button>
        </div>

        {/* Quantity */}
        <div className="flex gap-6 mx-auto col-span-2">
          {order.description ? order.description : "No description"}
        </div>

        {/* price */}
        <h3 className="text-right">
          {order.price ? `$${order.price.toFixed(2)}` : "$0.00"}
        </h3>
      </div>
    </div>
  );
};

export default EachCustomCartItem;
