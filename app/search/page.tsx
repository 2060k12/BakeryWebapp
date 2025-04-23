"use client";
import { DietaryOption } from "@/db/models/ItemModel";
import { ApiResponse } from "@/helpers/apiResponse";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PhotoView from "../components/PhotoView";
import Image from "next/image";

export interface CategoriesPayload {
  id: string;
  name: string;
  description: string;
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
}
const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState<CategoriesPayload[] | null>(
    null
  );
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
    setSelectedItem(null);
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

  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentCategoryItems, setCurrentCategoryItems] = useState<
    Item[] | null
  >(null);
  const [searchedItems, setSearchedItems] = useState<Item[] | null>(null);
  const handleSearch = async (name: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse<{ existingItems: Item[] }>>(
        `/api/items/search`,
        {
          params: {
            name,
          },
        }
      );
      if (response.data.data?.existingItems) {
        setSearchedItems(response.data.data.existingItems);
      } else {
        setCurrentCategoryItems([]); // fallback to empty array if no items
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Not found");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetchs all categories from the database
  const handleFetchAllCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse<CategoriesPayload[]>>(
        `/api/category/fetchAllCategory`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast("Failed to fetch data!", {
        position: "top-center",
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // fetch all items within a category
  const handleFetchAllItemsFromOneCategory = async (id: string) => {
    setIsLoading(true);
    setSearchedItems(null);
    try {
      const response = await axios.get<ApiResponse<{ items: Item[] }>>(
        `/api/category/fetchItems`,
        {
          params: {
            id,
          },
        }
      );
      console.log(response);
      if (response.data.data?.items) {
        setCurrentCategoryItems(response.data.data.items);
      } else {
        setCurrentCategoryItems([]); // fallback to empty array if no items
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast("Failed to fetch data!", {
        position: "top-center",
        icon: "❌",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Fetch categories once when mounted
  useEffect(() => {
    handleFetchAllCategories();
  }, []);

  // Fetch items when currentCategoryId changes
  useEffect(() => {
    if (currentCategoryId) {
      handleFetchAllItemsFromOneCategory(currentCategoryId);
    }
  }, [currentCategoryId]);
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center  z-50 h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
        </div>
      ) : (
        <div className="my-16 justify-center mx-auto w-3/4 ">
          <div className="flex justify-center gap-8 items-center ">
            {/* Search Text bar */}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border p-2 rounded-2xl w-full  px-4 py-4 text-xl "
              placeholder="Search Here"
            />
            {/* search button */}
            <button
              onClick={() => {
                handleSearch(inputValue);
              }}
              className="bg-blue-500 text-white rounded-2xl px-6 py-4 hover:bg-blue-400 hover:cursor-pointer"
            >
              Search
            </button>
          </div>

          <div className="  mx-2 mt-4">
            {searchedItems ? (
              <div className="">
                <h1 className="font-bold text-2xl">Searched Results</h1>
                <div className="flex md:flex-row flex-col gap-5 mt-4 ">
                  {searchedItems?.map((item) => (
                    <PhotoView
                      item={item}
                      key={item.id}
                      imageAlt=""
                      onClick={() => {
                        setSelectedItem(item);
                        openModal(
                          item.itemImage ? item.itemImage : "/images/cake1.jpg"
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          <div>
            {/* Title  */}
            <h2 className="text-2xl mt-4 p-2 font-bold">Categories</h2>

            {/* All Options */}
            <div className="flex flex-col md:flex-row ">
              {categories?.map((each) => (
                <h2
                  key={each.id}
                  className="text-xl px-2 hover:cursor-pointer hover:underline"
                  onClick={() => {
                    setCurrentCategoryId(each.id);
                  }}
                >
                  {each.name}
                </h2>
              ))}
            </div>
            {currentCategoryId == "" ? (
              <div className="mx-auto text-center mt-8 ">
                <h1 className="text-2xl font-semibold">
                  Click on the category to view lists
                </h1>
              </div>
            ) : (
              <div className="flex md:gap-5 md:flex-row flex-col mt-4">
                {currentCategoryItems?.length == 0 && (
                  <div className="mx-auto text-center mt-8 ">
                    <h1 className="text-2xl font-semibold">
                      No items available in this category
                    </h1>
                  </div>
                )}

                {currentCategoryItems?.map((item) => (
                  <PhotoView
                    item={item}
                    key={item.id}
                    imageAlt=""
                    onClick={() => {
                      setSelectedItem(item);
                      openModal(
                        item.itemImage ? item.itemImage : "/images/cake1.jpg"
                      );
                    }}
                  />
                ))}
              </div>
            )}
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
      )}
    </>
  );
};

export default Search;
