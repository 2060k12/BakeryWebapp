import React from "react";
import { OrderPayload } from "./OrderScreen"; // Adjust if your path is different

interface ReadyForDeliveryProps {
  orders: OrderPayload[];
  onClose: () => void;
}

const ReadyForDelivery: React.FC<ReadyForDeliveryProps> = ({
  orders,
  onClose,
}) => {
  return (
    <div>
      <h2 className="text-2xl mb-4 text-white">Ready For Delivery Orders</h2>
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
            </div>
          ))}
        </div>
      )}
      <button
        className="mt-4 bg-red-600 text-white p-2 rounded-sm hover:bg-red-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default ReadyForDelivery;
