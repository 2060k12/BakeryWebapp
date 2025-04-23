import { OrderStatus } from "@/db/models/OrderModel";
import React, { useState, useEffect } from "react";
import { OrderPayload } from "./OrderScreen";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";
import toast from "react-hot-toast";
import Image from "next/image";
import { DietaryOption } from "@/db/models/ItemModel";
import { CustomOrder } from "@/db/models/CustomOrder";

export interface ProofOfPayment {
  id?: string;
  proofScreenshot?: string;
}
export interface Item {
  id: string;
  name: string;
  itemImage: string | null;
  dietaryOption: DietaryOption;
  price: number;
  description: string;
  message: string;
  avaivable: boolean;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  addressDescription: string;
  identityProof: string;
}
export interface Order {
  id: string;
  orderName: string;
  GrossPrice: number;
  appliedPromo: string | null;
  discount: number | null;
  status: OrderStatus;
  deliveryDate: string;
  createdAt: string;
  deletedAt: string | null;
  proofOfPayment?: ProofOfPayment;
  items?: Item[];
  customOrder?: CustomOrder[];
  customer: Customer;
}

const ViewMoreDetailScreen = ({
  order,
  onClose,
}: {
  order: OrderPayload;
  onClose: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<Order | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  // Fetch all order details
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get<ApiResponse<Order>>(
        `${baseUrl}/api/orders/fetchDetail`,
        {
          params: {
            id: order.id,
          },
        }
      );

      setOrderDetail(response.data.data);
    } catch (error) {
      toast("Failed to fetch. " + error);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };
  const handleChangeStatus = async (newStatus: OrderStatus) => {
    try {
      if (!newStatus) {
        toast.error(newStatus + "empty");
      }
      const res = await axios.put<ApiResponse<OrderPayload>>(
        `${baseUrl}/api/orders/updateStatus`,
        {},
        {
          params: {
            id: order.id,
            status: newStatus,
          },
        }
      );

      if (res.status === 200) {
        toast.success(`Status updated to ${newStatus}`);
      }

      console.log(res.status);
      fetchOrderDetails(); // refresh details
      setShowStatusOptions(false);
    } catch (error) {
      toast.error("Failed to update status. " + error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (!orderDetail) return <p className="p-4">Loading order details...</p>;

  return (
    <div className="bg-black rounded-lg shadow-md max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 font-sans">
      <div className="p-6 font-sans bg-black rounded-lg shadow-md max-w-4xl mx-auto mt-8">
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
              <Image
                width={1000}
                height={1000}
                src={selectedImage}
                alt="Large preview"
                className="max-w-full max-h-screen rounded shadow-lg"
              />
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order: {orderDetail.orderName}</h1>
          <h1 className="text-2xl font-bold">#{orderDetail.id}</h1>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <strong>Status:</strong> {orderDetail.status}
            </p>
            <p>
              <strong>Delivery Date:</strong>{" "}
              {new Date(orderDetail.deliveryDate).toLocaleString()}
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowStatusOptions(!showStatusOptions)}
              className="bg-blue-400 w-full text-2xl p-2 rounded hover:cursor-pointer hover:bg-blue-300"
            >
              Change Status
            </button>
            {showStatusOptions && (
              <div className="mt-2 bg-white text-black rounded shadow p-2">
                {Object.values(OrderStatus).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleChangeStatus(status)}
                    className="block w-full text-left p-2 hover:bg-gray-200 rounded"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <p>
              <strong>Gross Price:</strong> ${orderDetail.GrossPrice}
            </p>
            <p>
              <strong>Promo:</strong> {orderDetail.appliedPromo || "None"}
            </p>
            <p>
              <strong>Discount:</strong>{" "}
              {orderDetail.discount ? `$${orderDetail.discount}` : "None"}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
          Customer Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <strong>Name:</strong> {orderDetail.customer.name}
            </p>
            <p>
              <strong>Email:</strong> {orderDetail.customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {orderDetail.customer.phoneNumber}
            </p>
          </div>
          <div>
            <p>
              <strong>Address:</strong> {orderDetail.customer.address}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {orderDetail.customer.addressDescription}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Proofs</h2>
        <div className="flex gap-6 mb-6">
          <Image
            src={
              orderDetail?.proofOfPayment?.proofScreenshot ||
              "/images/cake1.jpg"
            }
            alt="Payment screenshot"
            width={200}
            height={200}
            className="rounded shadow hover:cursor-pointer"
            onClick={() =>
              handleImageClick(
                orderDetail?.proofOfPayment?.proofScreenshot ||
                  "/images/cake1.jpg"
              )
            }
          />

          <Image
            src={orderDetail.customer.identityProof || "/images/cake1.jpg"}
            alt="Identity proof"
            width={200}
            height={200}
            className="rounded shadow hover:cursor-pointer"
            onClick={() =>
              handleImageClick(
                orderDetail.customer.identityProof || "/images/cake1.jpg"
              )
            }
          />
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orderDetail.items && orderDetail.items.length > 0 ? (
            orderDetail.items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                {item.itemImage && (
                  <Image
                    onClick={() =>
                      handleImageClick(item.itemImage || "/images/cake1.jpg")
                    }
                    src={item.itemImage}
                    alt={item.name}
                    width="150"
                    height={150}
                    className="rounded mb-2"
                  />
                )}
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <p>
                  <strong>Dietary Option:</strong> {item.dietaryOption}
                </p>
                <p>
                  <strong>Message:</strong> {item.message || "None"}
                </p>
                <p>
                  <strong>Available:</strong> {item.avaivable ? "Yes" : "No"}
                </p>
              </div>
            ))
          ) : (
            <div>
              <p>No items found.</p>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
          Custom Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orderDetail.customOrder && orderDetail.customOrder.length > 0 ? (
            orderDetail.customOrder.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                {item.itemImage && (
                  <Image
                    onClick={() =>
                      handleImageClick(item.itemImage || "/images/cake1.jpg")
                    }
                    src={item.itemImage}
                    alt={item.name}
                    width="150"
                    height="150"
                    className="rounded mb-2"
                  />
                )}
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>

                <p>
                  <strong>Message:</strong> {item.message || "None"}
                </p>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMoreDetailScreen;
