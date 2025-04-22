"use client";
import { DietaryOption, Item } from "@/db/models/ItemModel";
import { ApiResponse } from "@/helpers/apiResponse";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CategoriesPayload } from "../search/page";

const EditScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [detailView, setDetailView] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState<CategoriesPayload[] | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryDescription, setEditCategoryDescription] = useState("");
  React.useEffect(() => {
    handleFetchAllCategories();
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
      toast.error("Failed to fetch data!", {
        position: "top-center",
        icon: "❌",
      });
    }
  };

  const handleAddNewCategory = async (name: string, description: string) => {
    setOpenEditCategory(false);
    console.log("Adding new category:", name, description);
    if (name === "" || description === "") {
      toast.error("Name and description are required!");
      return;
    }
    try {
      const response = await axios.post<ApiResponse<CategoriesPayload[]>>(
        `/api/category/addCategory`,
        {
          name,
          description,
        }
      );
      setCategories(response.data.data);
      handleFetchAllCategories();
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category!", {
        position: "top-center",
        icon: "❌",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    console.log("Deleting category with ID:", id);
    if (!id) {
      toast.error("Categiory not selected!");
      return;
    }
    try {
      const response = await axios.delete<ApiResponse<object>>(
        `/api/category/deleteCategory`,
        {
          params: { id },
        }
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        setSelectedCategory(null);
      } else {
        toast.error("Failed to delete category!");
      }
      handleFetchAllCategories();
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category!", {
        position: "top-center",
        icon: "❌",
      });
    }
  };

  const handleEditCategory = async (
    id: string,
    description: string,
    name: string
  ) => {
    setAddNewCategory(false);
    console.log("Editing category with ID:", id);
    if (!id) {
      toast.error("Category not selected!");
      return;
    }
    try {
      const response = await axios.put<ApiResponse<object>>(
        `/api/category/update`,
        {
          id,
          name,
          description,
        }
      );
      if (response.status === 200) {
        toast.success("Category updated successfully!");
        setSelectedCategory(null);
      } else {
        toast.error("Failed to update category!");
      }
      handleFetchAllCategories();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category!", {
        position: "top-center",
        icon: "❌",
      });
    }
  };

  return (
    <div className="">
      {addNewCategory && (
        <div className="add-category-form flex flex-row gap-4 p-4  rounded-lg shadow-md">
          <h2 className="text-2xl mt-3 font-bold mb-4">Add New Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            className="border p-2 rounded-md"
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded-md"
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />
          <button
            onClick={async () => {
              await handleAddNewCategory(
                newCategoryName,
                newCategoryDescription
              );

              setAddNewCategory(false);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Category
          </button>
        </div>
      )}

      {openEditCategory && (
        <div className="add-category-form flex flex-row gap-4 p-4  rounded-lg shadow-md">
          <h2 className="text-2xl mt-3 font-bold mb-4">Edit Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            className="border p-2 rounded-md"
            onChange={(e) => setEditCategoryName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded-md"
            onChange={(e) => setEditCategoryDescription(e.target.value)}
          />
          <button
            onClick={async () => {
              await handleEditCategory(
                categories?.find((cat) => cat.name === selectedCategory)?.id ||
                  "",
                editCategoryDescription,
                editCategoryName
              );
              setOpenEditCategory(false);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save New Details
          </button>
        </div>
      )}

      <div className="m-4 ">
        <div className="relative inline-block  w-full">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full text-xl hover:cursor-pointer"
            >
              Filter By Category
            </button>
            <button
              onClick={() => {
                setAddNewCategory(true);
                setOpenEditCategory(false);
                setIsOpen(false);
              }}
              className="px-4 py-4 bg-transparent border-1 text-white rounded-md hover:bg-green-400 w-full text-xl hover:cursor-pointer"
            >
              Add New Category
            </button>
          </div>
          {isOpen && (
            <div className="absolute mt-2 w-48  border rounded-md shadow-lg bg-black">
              {categories &&
                Array.isArray(categories) &&
                categories.length > 0 &&
                categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-row justify-between "
                  >
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setIsOpen(false);
                      }}
                    >
                      {category.name || ""}
                    </button>
                  </div>
                ))}
              <button
                key={"all"}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSelectedCategory("all");
                  setIsOpen(false);
                }}
              >
                All Categories
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col  py-2 px-4 text-white rounded-lg shadow-md">
        <strong>
          Selected : {selectedCategory ? selectedCategory : "None"}{" "}
        </strong>

        <p className="text-sm">
          {selectedCategory
            ? categories?.find((cat) => cat.name === selectedCategory)
                ?.description || ""
            : "Select a category to see its description"}
        </p>
      </div>
      {items && items.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 py-4">
          {items
            .filter((item) => {
              // Show only if selectedCategory is not empty and item matches the category
              if (selectedCategory === "all" || !selectedCategory) return true;
              return item.category.name === selectedCategory;
            })
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center p-2 rounded-lg shadow-md"
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
                  className="rounded-2xl aspect-square"
                />
                <h4 className="flex justify-center text-xl">{item.name}</h4>
              </div>
            ))}
        </div>
      ) : (
        <p>No items available</p>
      )}

      {selectedCategory && selectedCategory !== "all" && (
        <div className="flex flex-row  px-4 rounded-lg shadow-md w-full gap-2">
          <button
            onClick={() =>
              handleDeleteCategory(
                categories?.find((cat) => cat.name === selectedCategory)?.id ||
                  ""
              )
            }
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-1/2"
          >
            Delete This Category
          </button>
          <button
            onClick={() => {
              setAddNewCategory(false);
              setOpenEditCategory(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2 w-1/2 "
          >
            Edit This Category
          </button>
        </div>
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
