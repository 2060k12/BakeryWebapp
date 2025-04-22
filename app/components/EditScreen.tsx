"use client";
import { DietaryOption, Item } from "@/db/models/ItemModel";
import { ApiResponse } from "@/helpers/apiResponse";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const EditScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [detailView, setDetailView] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const fetchItems = async () => {
    try {
      const fetchedItems = await axios.get<ApiResponse<Item[]>>(
        "/api/items/fetchAll"
      );

      if (fetchedItems.status !== 200) {
        throw new Error("Failed to fetch items");
      } else {
        setItems(fetchedItems.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put<ApiResponse<Item>>(
        `/api/items/update`,
        {
          id: selectedItem?.id,
          name: selectedItem?.name,
          description: selectedItem?.description,
          dietaryOption: selectedItem?.dietaryOption,
          price: selectedItem?.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Item updated successfully");
        setDetailView(false);
        fetchItems();
      } else {
        toast.error("Failed to update item");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating item");
    }
  };

  // fetch all categiories

  return (
    <div className="">
      <div className="m-4 ">
        <div className="relative inline-block  w-full ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full text-xl hover:cursor-pointer"
          >
            Filter By Category
          </button>

          {isOpen && (
            <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Cakes
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Pastery
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Gifts
              </button>
            </div>
          )}
        </div>
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 mx-20 ">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center  p-4 rounded-lg shadow-md"
              onClick={() => {
                setDetailView(true);
                setSelectedItem(item);
              }}
            >
              <Image
                alt="Image for banner"
                src={item.itemImage || ""}
                width={200}
                height={100}
                className="rounded-3xl aspect-square  "
              />
              <h4 className="flex justify-center text-xl">{item.name}</h4>
            </div>
          ))}
        </div>
      ) : (
        <p>No items available</p>
      )}

      {detailView && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="border-1 border-white rounded-2xl p-6 shadow-lg w-1/2 h-2/3 overflow-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl mt-3 font-bold mb-4">Edit Item</h2>
              <button
                onClick={() => setDetailView(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <Image
                alt="Image for banner"
                src={selectedItem.itemImage || ""}
                width={200}
                height={200}
                className="rounded-3xl object-cover"
              />
              <p>
                <strong>Category: </strong>
                {selectedItem.category.name || ""}
              </p>
              <input
                type="text"
                value={selectedItem.name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                className="border p-2 rounded-md"
                placeholder="Item Name"
              />

              <textarea
                value={selectedItem.description}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    description: e.target.value,
                  })
                }
                className="border p-2 rounded-md"
                placeholder="Description"
              />
              <select
                value={selectedItem.dietaryOption}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    dietaryOption: e.target.value as DietaryOption,
                  })
                }
                className="border p-2 rounded-md"
              >
                <option value="">Select Dietary Option</option>
                <option value="VEGAN">Vegan</option>
                <option value="DAIRY_FREE">Dairy Free</option>
                <option value="VEGETARIAN_CONTAINS_EGG">
                  Vegetarian (Contains Egg)
                </option>
                <option value="All_OPTIONS">All Options</option>
              </select>
              <input
                type="number"
                value={selectedItem.price}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    price: parseFloat(e.target.value),
                  })
                }
                className="border p-2 rounded-md"
                placeholder="Price"
              />

              <button
                onClick={() => handleSave()}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditScreen;
