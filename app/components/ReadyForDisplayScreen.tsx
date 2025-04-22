import React, { useState } from "react";
import { OrderPayload } from "./OrderScreen"; // Adjust if your path is different
import ViewMoreDetailScreen from "./ViewMoreDetailScreen";

interface ReadyForDeliveryProps {
  orders: OrderPayload[];
  onClose: () => void;
}

const ReadyForDelivery: React.FC<ReadyForDeliveryProps> = ({
  orders,
  onClose,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderPayload | null>(null);

  return (
    <div>
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <ViewMoreDetailScreen
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      )}
      <div className="flex flex-row items-center justify-between  text-white py-4 rounded-sm">
        <h2 className="text-2xl  text-white">Ready For Delivery Orders</h2>
        <button
          className=" bg-red-600 text-white p-2 rounded-sm hover:bg-red-500 hover:cursor-pointer hover:border-red-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-white">No orders ready for delivery.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-black text-white p-4 rounded-sm">
              <div className="flex justify-between">
                <h2>{order.orderName || "Unknown"}</h2>
                <h2>#{order.id}</h2>
              </div>
              <div className="flex justify-between">
                <h2>
                  Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                </h2>
                <h2>${order.GrossPrice}</h2>
              </div>
              <div className="mt-2">
                <h2>
                  Order Placed: {new Date(order.createdAt).toLocaleDateString()}
                </h2>
                <h2>Promo Code: {order.appliedPromo || "None"}</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedOrder(order);
                }}
                className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadyForDelivery;
