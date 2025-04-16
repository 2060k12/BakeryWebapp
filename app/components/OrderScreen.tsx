"use client";
import React, { useEffect, useState } from "react";
import { OrderStatus } from "@/db/models/OrderModel";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";
import toast from "react-hot-toast";
import ViewMoreDetailScreen from "./ViewMoreDetailScreen";
import ReadyForDelivery from "./ReadyForDisplayScreen";

export interface OrderPayload {
  id: string;
  GrossPrice: number;
  appliedPromo: string;
  discount: number;
  status: OrderStatus;
  orderName?: string;
  deliveryDate: Date;
  createdAt: Date;
  deletedAt: string | null;
}
const OrderScreen = () => {
  const [openReadyForDelivery, setOpenReadyForDelivery] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderPayload | null>(null);
  const [orders, setOrders] = useState<OrderPayload[] | null>(null);
  const baseUrl = process.env.BASE_URL || "";
  const handleFetchAllOrders = async () => {
    try {
      const response = await axios.get<ApiResponse<OrderPayload[]>>(
        `${baseUrl}/api/orders/fetch`
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
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
            <ViewMoreDetailScreen
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          </div>
        )}
        {/* Each Pending Orders */}
        <h2 className="text-xl">Pending Orders</h2>
        <div className="grid grid-cols-2 gap-x-3 space-y-4">
          {orders
            ?.filter((item) => item.status === OrderStatus.PENDING)
            .map((each) => (
              <div
                key={each.id}
                className=" bg-black text-white rounded-sm p-4"
              >
                <div className="flex justify-between">
                  <h2>
                    Order Name: {each.orderName ? each.orderName : "Unknown"}
                  </h2>

                  <h2>#{each.id}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>${each.GrossPrice}</h2>
                </div>
                <div className="flex gap-10">
                  <h2>Order Placed : </h2>
                  <h2>{new Date(each.createdAt).toLocaleDateString()}</h2>
                </div>
                <h2>Promo Code : {each.appliedPromo || ""}</h2>

                <button
                  onClick={() => {
                    setSelectedOrder(each);
                  }}
                  className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full"
                >
                  View Details
                </button>
              </div>
            ))}
        </div>

        {/* On Going orders */}
        <h2 className="text-xl my-4">On-going Orders</h2>
        <div className="grid grid-cols-2 gap-x-3 space-y-4">
          {orders
            ?.filter((item) => item.status === OrderStatus.ONGOING)
            .map((each) => (
              <div
                key={each.id}
                className=" bg-black text-white rounded-sm p-4"
              >
                <div className="flex justify-between">
                  <h2>{each.orderName ? each.orderName : "Unknown"}</h2>
                  <h2>#{each.id}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>{new Date(each.deliveryDate).toLocaleDateString()}</h2>
                  <h2>{new Date(each.deliveryDate).toLocaleDateString()}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>${each.GrossPrice}</h2>
                </div>
                <div className="flex gap-10">
                  <h2>Order Placed : </h2>
                  <h2>{new Date(each.createdAt).toLocaleDateString()}</h2>
                </div>
                <h2>Promo Code : {each.appliedPromo || ""}</h2>

                <button
                  onClick={() => {
                    setSelectedOrder(each);
                  }}
                  className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full"
                >
                  View Details
                </button>
              </div>
            ))}
        </div>

        <h2 className="text-xl my-4">Ready for delivery</h2>
        <div className="grid grid-cols-2 gap-x-3 space-y-4">
          {orders
            ?.filter((item) => item.status === OrderStatus.READYFORDELIVERY)
            .map((each) => (
              <div
                key={each.id}
                className=" bg-black text-white rounded-sm p-4"
              >
                <div className="flex justify-between">
                  <h2>{each.orderName ? each.orderName : "Unknown"}</h2>
                  <h2>#{each.id}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>{new Date(each.deliveryDate).toLocaleDateString()}</h2>
                  <h2>{new Date(each.deliveryDate).toLocaleDateString()}</h2>
                </div>
                {/* <div className="grid grid-cols-2 gap-2"> */}
                <button
                  onClick={() => {
                    setSelectedOrder(each);
                  }}
                  className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full"
                >
                  View Details
                </button>
                {/* <button className="text-xl bg-green-600 border-2 border-green-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
                    Ready For delivery
                  </button> */}
                {/* </div> */}
              </div>
            ))}
        </div>

        <h2 className="text-xl my-4">Delivered Orders</h2>
        <div className="grid grid-cols-2 gap-x-3 space-y-4">
          {orders
            ?.filter((item) => item.status === OrderStatus.DELIVERED)
            .map((each) => (
              <div
                key={each.id}
                className=" bg-black text-white rounded-sm p-4"
              >
                <div className="flex justify-between">
                  <h2>{each.orderName ? each.orderName : "Unknown"}</h2>
                  <h2>#{each.id}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>{new Date(each.deliveryDate).toLocaleDateString()}</h2>
                  <h2>{new Date(each.deliveryDate).toLocaleDateString()}</h2>
                </div>
                <div className="flex justify-between">
                  <h2>${each.GrossPrice}</h2>
                </div>
                <div className="flex gap-10">
                  <h2>Order Placed : </h2>
                  <h2>{new Date(each.createdAt).toLocaleDateString()}</h2>
                </div>
                <h2>Promo Code : {each.appliedPromo || ""}</h2>

                <button
                  onClick={() => {
                    setSelectedOrder(each);
                  }}
                  className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full"
                >
                  View Details
                </button>
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
            <ReadyForDelivery
              orders={
                orders?.filter(
                  (order) => order.status === OrderStatus.READYFORDELIVERY
                ) || []
              }
              onClose={() => setOpenReadyForDelivery(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
