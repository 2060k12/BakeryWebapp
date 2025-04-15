"use client";
import React, { useEffect, useState } from "react";
import ReadyForDelivery from "./ReadyForDelivery";
import { OrderStatus } from "@/db/models/OrderModel";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";
import toast, { Toaster } from "react-hot-toast";
import { Item } from "@/db/models/ItemModel";

export interface Order {
  id: string;
  GrossPrice: number;
  appliedPromo: string;
  discount: number;
  status: OrderStatus;
  deliveryDate: Date;
  createdAt: Date;
  deletedAt: string | null;
}
const OrderScreen = () => {
  const [openReadyForDelivery, setOpenReadyForDelivery] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);

  const handleFetchAllOrders = async () => {
    try {
      const response = await axios.get<ApiResponse<Order[]>>(
        `${process.env.BASE_URL}/api/orders/fetch`
      );

      setOrders(response.data.data);
    } catch (error) {
      toast("Failed to fetch. " + error);
    }
  };

  useEffect(() => {
    handleFetchAllOrders();
  }, []);

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl">Pending Orders</h2>

        {/* Each Pending Orders */}

        <div className="grid grid-cols-2 gap-x-3 space-y-4">
          {/* Order 1 */}
          <div className=" bg-black text-white rounded-sm p-3">
            <div className="flex justify-between">
              <h2>Birthday Cake</h2>
              <h2># 44345</h2>
            </div>
            <div className="flex justify-between">
              <h2>1 xyz street, Campsie, 2194</h2>
              <h2>28 Mar, 2025</h2>
            </div>
            <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              View Details
            </button>
          </div>
          {/* Order 2 */}
          <div className=" bg-black text-white rounded-sm p-4">
            <div className="flex justify-between">
              <h2>Birthday Cake</h2>
              <h2># 44345</h2>
            </div>
            <div className="flex justify-between">
              <h2>1 xyz street, Campsie, 2194</h2>
              <h2>28 Mar, 2025</h2>
            </div>
            <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              View Details
            </button>
          </div>
          {/* Order 3 */}
          <div className=" bg-black text-white rounded-sm p-4">
            <div className="flex justify-between">
              <h2>Birthday Cake</h2>
              <h2># 44345</h2>
            </div>
            <div className="flex justify-between">
              <h2>1 xyz street, Campsie, 2194</h2>
              <h2>28 Mar, 2025</h2>
            </div>
            <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              View Details
            </button>
          </div>
        </div>

        <h2 className="text-xl my-4">On-going Orders</h2>
        <div className="grid grid-cols-2 gap-x-3 space-y-4">
          {orders
            ?.filter((item) => item.status === OrderStatus.PENDING)
            .map((each) => (
              <div
                key={each.id}
                className=" bg-black text-white rounded-sm p-4"
              >
                <div className="flex justify-between">
                  <h2>Birthday Cake</h2>
                  <h2># 44345</h2>
                </div>
                <div className="flex justify-between">
                  <h2>1 xyz street, Campsie, 2194</h2>
                  <h2>28 Mar, 2025</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
                    View Details
                  </button>
                  <button className="text-xl bg-green-600 border-2 border-green-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
                    Ready For delivery
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* View previous orders when this button is pressed */}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            className="text-xl bg-blue-600 text-white p-4 rounded-sm hover:cursor-pointer hover:bg-blue-500"
            onClick={() => setOpenReadyForDelivery(true)}
          >
            Ready For Delivery
          </button>
          <button className="text-xl border-2 text-white p-4 rounded-sm hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500">
            Previous Orders
          </button>
        </div>
      </div>

      {openReadyForDelivery && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <button
              className="hover:cursor-pointer text-right w-full mb-4 text-red-700 text-2xl"
              onClick={() => setOpenReadyForDelivery(false)}
            >
              back
            </button>
            <ReadyForDelivery />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
