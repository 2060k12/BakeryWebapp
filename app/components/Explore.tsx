import React, { useEffect, useState } from "react";
import PhotoView from "./PhotoView";
import Image from "next/image";
import axios from "axios";
import { DietaryOption } from "@/db/models/ItemModel";
import { ApiResponse } from "@/helpers/apiResponse";
import toast from "react-hot-toast";

export interface Item {
  id: string;
  name: string;
  itemImage: string | null;
  dietaryOption: DietaryOption;
  price: number;
  description: string;
  message: string;
  avaivable: boolean;
  createdAt?: string;
  updatedAt?: string;
}
const ExploreScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[] | null>(null);
  // handle opening the model with a selcted image
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
    setSelectedItem(null);
  };

  const fetchAllItems = async () => {
    try {
      const res = await axios.get<ApiResponse<Item[]>>(`/api/items/fetchAll`);
      setItems(res.data.data);
    } catch (error) {
      toast.error("Something went wrong, " + error);
    }
  };

  const handleSubmit = async () => {
    const order = selectedItem;

    // Get existing orders from localStorage, or initialize as empty array
    const existingOrders: Item[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    const isAlreadyInCart = existingOrders.some(
      (item) => item.id === order?.id
    );
    if (isAlreadyInCart) {
      toast.error("Same item already in cart");
      return;
    }

    // Add the new order to the array
    existingOrders.push(order as Item);

    // Save the updated array back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingOrders));

    toast.success("Added to cart!");
  };

  useEffect(() => {
    fetchAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="xl:px-16 lg:px-16 md:px-8 px-2 py-8 md:py-4">
      {/* This is the explore page Feed */}

      <div className="flex flex-wrap gap-6 my-2 md:my-12 justify-center ">
        {items?.map((item) => (
          <PhotoView
            item={item}
            key={item.id}
            imageAlt="Sample Image"
            onClick={() => {
              setSelectedItem(item);
              openModal(item.itemImage ? item.itemImage : "/images/cake1.jpg");
            }}
          />
        ))}
      </div>
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center m-auto overflow-y-auto max-h-screen">
          <div className="flex flex-col md:flex-row bg-black rounded-4xl max-w-7xl w-11/12 md:w-auto">
            <Image
              className="
              aspect-squarerounded-t-4xl md:rounded-l-4xl md:rounded-tr-none w-full md:w-auto max-h-96 md:max-h-none object-cover"
              src={selectedImage}
              alt="Selected"
              width={400}
              height={400}
            />

            {/* description  section */}
            <div className="grid grid-rows-2  px-6 py-6 md:px-10 md:py-8 mt-2 md:mt-0 content-between text-white">
              <div>
                {/* Title and close button */}
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-2xl md:text-3xl">
                    {selectedItem?.name}
                  </h4>
                  <button
                    onClick={closeModal}
                    className="text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-300 hover:cursor-pointer"
                  >
                    X
                  </button>
                </div>
                {/* Dietary Options */}

                <div className="mt-4 md:mt-8">
                  <h4 className="font-semibold text-md md:text-lg">
                    {" "}
                    Dietary Option:{" "}
                  </h4>
                  <h4 className="font-semibold text-md md:text-lg">
                    {selectedItem?.dietaryOption
                      ? selectedItem.dietaryOption
                      : "N/A"}
                  </h4>
                  <hr className="my-3 md:my-5 border-gray-700" />
                  <h4 className="font-semibold text-md md:text-lg">
                    {selectedItem?.description}
                  </h4>
                  <h4 className="font-bold text-lg md:text-xl mt-2">
                    Price: ${selectedItem?.price}
                  </h4>
                </div>
              </div>
              {/* Order Now Button */}
              <div className="flex justify-between  md:gap-4 mt-4 md:mt-8 h-16">
                <button
                  className="bg-red-500  w-1/2  text-white p-2 rounded-md font-semibold hover:cursor-pointer hover:bg-red-600 transition duration-200 **min-h-[40px]**"
                  onClick={closeModal}
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    handleSubmit();
                    closeModal();
                  }}
                  className="bg-green-500  w-1/2  text-white p-2 rounded-md font-bold hover:cursor-pointer hover:bg-green-600 transition duration-200 **min-h-[40px]**"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreScreen;
