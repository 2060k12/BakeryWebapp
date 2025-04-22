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
const Photos = () => {
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

  const baseUrl = process.env.BASE_URL || "";
  const fetchAllItems = async () => {
    try {
      const res = await axios.get<ApiResponse<Item[]>>(
        `${baseUrl}/api/items/fetchAll`
      );
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

    // Add the new order to the array
    existingOrders.push(order as Item);

    // Save the updated array back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingOrders));

    toast.success("Added to cart!");
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <div className="xl:px-16 lg:px-16 md:px-8 px-2 py-4 md:py-16">
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
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center w-1/2 h-1/2 m-auto">
          <div className="flex bg-black rounded-4xl max-w-7xl  ">
            <div className="flex justify-between items-center "></div>
            <Image
              className="rounded-4xl"
              src={selectedImage}
              alt="Selected"
              width={350}
              height={400}
            />

            {/* description  section */}
            <div className=" grid grid-row-2 px-10 py-8 mt-2 content-between">
              <div>
                {/* Titile and close button */}
                <div className="grid grid-cols-6 content-between ">
                  <h4 className=" font-bold text-3xl col-span-4 ">
                    {selectedItem?.name}
                  </h4>

                  <div className="flex justify-end col-span-2">
                    <button
                      onClick={closeModal}
                      className=" text-2xl font-bold text-black hover:cursor-pointer "
                    >
                      X
                    </button>
                  </div>
                </div>
                {/* Diatery Options */}

                <div className="mt-8">
                  <h4 className="font-bold"> Dietary Option: </h4>
                  <h4 className="font-bold">
                    {" "}
                    {selectedItem?.dietaryOption
                      ? selectedItem.dietaryOption
                      : "N/A"}{" "}
                  </h4>
                  <hr className="my-5" />
                  <h4 className="font-bold"> {selectedItem?.description}</h4>
                  <h4 className="font-bold">Price: ${selectedItem?.price}</h4>
                </div>
              </div>
              {/* Order Now Button */}
              <div>
                <button
                  onClick={() => {
                    handleSubmit();
                    closeModal();
                  }}
                  className="text-3xl font-bold text-green-500 hover:cursor-pointer "
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

export default Photos;
