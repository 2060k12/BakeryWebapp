"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";
import { CategoriesPayload } from "../search/page";

enum DietaryOption {
  VEGAN = "VEGAN",
  DAIRY_FREE = "DAIRY_FREE",
  VEGETARIAN_CONTAINS_EGG = "VEGETARIAN_CONTAINS_EGG",
  ALL_OPTIONS = "All_OPTIONS",
}

const AdminUploadScreen = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dietaryOption, setDietaryOption] = useState<DietaryOption>(
    DietaryOption.VEGAN
  );
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoriesPayload[]>([]);
  const [formData, setFormData] = useState({
    cakeName: "",
    description: "",
    price: "",
  });

  const baseUrl = process.env.BASE_URL || "";

  // Fetch categories on mount
  useEffect(() => {
    const handleFetchAllCategories = async () => {
      try {
        const response = await axios.get<ApiResponse<CategoriesPayload[]>>(
          `${baseUrl}/api/category/fetchAllCategory`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories!", {
          position: "top-center",
          icon: "❌",
        });
      }
    };

    handleFetchAllCategories();
  }, []);

  // Image upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Upload a reference image first");
      return;
    }
    if (!categoryId) {
      toast.error("Select a category");
      return;
    }

    try {
      // 1. Get signed URL for the image upload
      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!uploadResponse.ok) {
        toast.error("Failed to get upload URL");
        return;
      }

      const { uploadUrl } = await uploadResponse.json();

      // 2. Upload the image to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      // 3. Get the public image URL (remove query params from the signed URL)
      const uploadedImageUrl = uploadUrl.split("?")[0];

      if (!uploadedImageUrl) {
        toast.error("Image upload failed");
        return;
      }

      // 4. Call your create item API
      await handleCreateNewOrderApiCall({
        name: formData.cakeName,
        description: formData.description,
        message: "",
        dietaryOption,
        price: Number(formData.price),
        categoryId,
        itemImage: uploadedImageUrl,
      });

      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleCreateNewOrderApiCall = async (req: {
    name: string;
    description: string;
    message: string;
    dietaryOption: string;
    price: number;
    categoryId: string;
    itemImage: string;
  }) => {
    try {
      const response = await axios.post<ApiResponse<object>>(
        `/api/items/add`,
        req
      );
      if (response.data.success) {
        toast.success("Item created successfully!");
      } else {
        toast.error("Failed to create item.");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("Failed to create item.");
    }
  };

  return (
    <div className="grid grid-cols-4 m-8 gap-6">
      {/* Upload Section */}
      <section className="flex flex-col col-span-2">
        <div
          {...getRootProps()}
          className="bg-gray-900 rounded-xl w-full h-full aspect-square flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 hover:bg-gray-300 transition"
        >
          <input {...getInputProps()} />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Cake Reference"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center">
              <IoCloudUploadOutline className="text-4xl text-gray-600" />
              <span className="text-gray-600 text-sm">Upload New Item</span>
            </div>
          )}
        </div>
      </section>

      {/* Form Section */}
      <section className="flex flex-col col-span-2">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto h-full p-5 border rounded-xl shadow-lg space-y-4 bg-black border-gray-600"
        >
          <input
            type="text"
            name="cakeName"
            placeholder="Item Name"
            value={formData.cakeName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            required
          ></textarea>

          <div className="flex">
            <span className="text-2xl py-2 pr-4">$</span>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Category Selection */}
          <select
            value={categoryId || ""}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Dietary Option Selection */}
          <select
            value={dietaryOption}
            onChange={(e) => setDietaryOption(e.target.value as DietaryOption)}
            className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {Object.values(DietaryOption).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="text-green-400 font-bold text-2xl text-left p-2 rounded-md hover:text-green-300 hover:cursor-pointer transition duration-300"
          >
            Upload
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminUploadScreen;
