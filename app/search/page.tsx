"use client";
import { DietaryOption } from "@/db/models/ItemModel";
import { ApiResponse } from "@/helpers/apiResponse";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoFilter } from "react-icons/io5";
import PhotoView from "../components/PhotoView";

interface CategoriesPayload {
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
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState<CategoriesPayload[] | null>(
    null
  );

  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [currentCategoryItems, setCurrentCategoryItems] = useState<
    Item[] | null
  >(null);

  // Fetchs all categories from the database
  const handleFetchAllCategories = async () => {
    const baseUrl = process.env.BASE_URL || "";
    try {
      const response = await axios.get<ApiResponse<CategoriesPayload[]>>(
        `${baseUrl}/api/category/fetchAllCategory`
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast("Failed to fetch data!", {
        position: "top-center",
        icon: "❌",
      });
    }
  };

  // fetch all items within a category
  const handleFetchAllItemsFromOneCategory = async (id: string) => {
    const baseUrl = process.env.BASE_URL || "";
    try {
      const response = await axios.get<ApiResponse<{ items: Item[] }>>(
        `${baseUrl}/api/category/fetchItems`,
        {
          params: {
            id,
          },
        }
      );
      console.log(response);
      if (response.data.data?.items) {
        toast("success");

        setCurrentCategoryItems(response.data.data.items);
      } else {
        setCurrentCategoryItems([]); // fallback to empty array if no items
      }
    } catch (error) {
      toast("failed");

      console.error("Error fetching data:", error);
      toast("Failed to fetch data!", {
        position: "top-center",
        icon: "❌",
      });
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
        {/* Filter Icon */}
        <IoFilter className="md:text-5xl text-3xl text" />
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
          <div className="flex gap-5 mt-4">
            {currentCategoryItems?.map((item) => (
              <PhotoView
                item={item}
                key={item.id}
                imageAlt=""
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
