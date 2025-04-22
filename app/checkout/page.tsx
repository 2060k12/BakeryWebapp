"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useOrderStore } from "@/helpers/store";
import toast from "react-hot-toast";

const Checkout = () => {
  const order = useOrderStore((state) => state.order);

  // Local state for customer info editing
  const [customer, setCustomer] = useState(
    order?.customer || {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      addressDescription: "",
      identityProof: "",
    }
  );
  if (!order) return <p className="text-center">No order data found.</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    if (
      !customer.name ||
      !customer.email ||
      !customer.phoneNumber ||
      !customer.address ||
      !customer.addressDescription ||
      !customer.identityProof
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // Here you would typically send the order to your backend
    toast.success("Order submitted successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center py-4">Checkout</h1>
      <p className="text-center text-gray-600">
        Please review your order details and customer information.
      </p>
      <div className=" grid grid-cols-2 gap-4 max-w-3xl mx-auto py-8 px-4">
        {/* Order Summary */}
        <div className=" ">
          <div className="border-2 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <p>
              <strong>Order Name:</strong> {order.orderName}
            </p>
            <p>
              <strong>Delivery Date:</strong>{" "}
              {new Date(order.deliveryDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Gross Price:</strong> ${order.GrossPrice.toFixed(2)}
            </p>
            <p>
              <strong>Discount:</strong> {order.discount}%
            </p>
            <p>
              <strong>Promo Applied:</strong> {order.appliedPromo || "None"}
            </p>
          </div>

          {/* Editable Customer Information */}
          <div className="border-2 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={customer.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Address</label>
                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Address Description</label>
                <textarea
                  name="addressDescription"
                  value={customer.addressDescription}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">
                  Identity Proof (URL)
                </label>
                <input
                  type="text"
                  name="identityProof"
                  value={customer.identityProof}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
                {customer.identityProof && (
                  <Image
                    src={customer.identityProof}
                    alt="Identity Proof"
                    height={200}
                    width={200}
                    className="rounded mt-2"
                  />
                )}
              </div>

              <button
                onClick={handleSubmitOrder}
                className="w-full bg-green-500 p-4 text-xl font-bold text-white rounded hover:bg-green-600 hover:cursor-pointer"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
        <div className=" ">
          {/* Items */}
          <div className="border-2 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Items</h2>
            <ul className="list-disc list-inside space-y-1">
              {order.items.map((item, index) => (
                <li key={index}>
                  Item ID: <span className="font-semibold">{item.id}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom Orders */}
          <div className="border-2 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Custom Orders</h2>
            <ul className="space-y-4">
              {order.customOrders.map((custom, index) => (
                <li key={index} className="border rounded p-3">
                  <p className="font-semibold">Name: {custom.name}</p>
                  <p className="text-sm text-gray-600">
                    Message: {custom.message}
                  </p>
                  <p className="italic text-gray-500">
                    Order Description: {custom.description}
                  </p>
                  <p className="font-bold">Price: ${custom.price}</p>
                  {custom.itemImage && (
                    <Image
                      src={custom.itemImage}
                      alt={custom.name}
                      height={100}
                      width={100}
                      className="rounded mt-2"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Proof of Payment */}
          {order.proofScreenshot ? (
            <div className="border-2 rounded-lg shadow p-6 mb-6 text-center">
              <h2 className="text-xl font-bold mb-2">Proof of Payment</h2>
              <Image
                src={order.proofScreenshot}
                alt="Proof of Payment"
                height={300}
                width={300}
                className="rounded mx-auto"
              />
            </div>
          ) : (
            <div className="border-2 rounded-lg shadow p-6 mb-6 text-center">
              <h2 className="text-xl font-bold mb-2">No Proof of Payment</h2>
              <p>Please upload your proof of payment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
