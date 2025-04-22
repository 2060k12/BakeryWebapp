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
            image="/images/cake1.jpg"
            imageAlt="Sample Image"
            onClick={() => {
              setSelectedItem(item);
              openModal(item.itemImage ? item.itemImage : "/images/cake1.jpg");
            }}
          />
        ))}

        {/* <PhotoView
          image="/images/cake1.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake1.jpg")}
        />
        <PhotoView
          image="/images/cake2.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake2.jpg")}
        />
        <PhotoView
          image="/images/cake3.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake3.jpg")}
        />
        <PhotoView
          image="/images/cake4.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake4.jpg")}
        />
        <PhotoView
          image="/images/cake5.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake5.jpg")}
        />
        <PhotoView
          image="/images/cake6.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake6.jpg")}
        />
        <PhotoView
          image="/images/cake7.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake7.jpg")}
        /> */}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
          <div className="flex bg-black rounded-4xl max-w-7xl mx-auto ">
            <div className="flex justify-between items-center "></div>
            <Image
              src={selectedImage}
              alt="Selected"
              className="rounded-4xl"
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
                  <h4 className="font-bold"> Diatery Options</h4>

                  <h4 className="font-bold"> Vegan - Plant based</h4>
                  <h4 className="font-bold"> Contains eggs</h4>
                  <h4 className="font-bold"> Lactos Free - No dariy</h4>
                  <hr className=" my-4" />
                  <h4 className="font-bold"> {selectedItem?.description}</h4>
                  <h4 className="font-bold">Price: ${selectedItem?.price}</h4>
                </div>
              </div>
              {/* Order Now Button */}
              <div>
                <button
                  onClick={closeModal}
                  className="text-3xl font-bold text-green-500 hover:cursor-pointer "
                >
                  Order Now
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
