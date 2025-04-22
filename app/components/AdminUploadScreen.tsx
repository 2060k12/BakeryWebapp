"use client";
import { CldImage } from "next-cloudinary";

import React, { useCallback, useState } from "react";

import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import toast from "react-hot-toast";
import Dropdown from "./DropDown";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";
import { uploadResult } from "@/lib/cloudinari";

const AdminUploadScreen = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  // Handle File Upload
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const [formData, setFormData] = useState({
    cakeName: "",
    description: "",
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(imagePreview);
    if (!imagePreview) {
      toast.error("Upload a reference first");
      e.preventDefault();
      return;
    }

    const uploadImage = async (imageBase64: string) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      const data = await response.json();
      return data.url;
    };
    if (!uploadImage) {
      toast.error("Unable to upload Image");
      return;
    }
    handleCreateNewOrderApiCall({
      categoryId: "",
      description: formData.description,
      itemImage: uploadImage.toString(),
      message: "",
      dietaryOption: "",
      name: formData.cakeName,
      price: formData.price,
    });

    console.log("Form Submitted:", formData);
    alert("Cake order submitted successfully!");
  };

  const baseUrl = process.env.BASE_URL || "";
  // create a new order api call
  const handleCreateNewOrderApiCall = (req: {
    name: string;
    description: string;
    message: string;
    dietaryOption: string;
    price: number;
    categoryId: string;
    itemImage: string;
  }) => {
    try {
      const res = axios.post<ApiResponse<object>>(
        `${baseUrl}/api/items/add`,
        {}
      );
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  return (
    <div className="grid grid-cols-4 m-8">
      {/* Cake Reference Section */}
      <section className="flex flex-col col-span-2">
        <div
          {...getRootProps()}
          className="bg-gray-900 rounded-xl w-full h-full aspect-square flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 hover:bg-gray-300 transition"
        >
          <input {...getInputProps()} />
          {imagePreview ? (
            <CldImage
              src={imagePreview}
              width="500"
              height="500"
              alt="Uploaded Cake Reference"
              crop={{
                type: "auto",
                source: true,
              }}
            />
          ) : (
            // <Image
            //   src={imagePreview}
            //   alt="Cake Reference"
            //   height={200}
            //   width={200}
            //   className="w-full h-full object-cover rounded-xl"
            // />
            <div className="flex flex-col items-center ">
              <IoCloudUploadOutline className="text-4xl text-gray-600" />
              <span className="text-gray-600 text-sm">Upload New Item</span>
            </div>
          )}
        </div>
      </section>

      {/* Text Field Section */}
      <section className="flex flex-col col-span-2">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto h-full p-5 border rounded-xl shadow-lg space-y-4 bg-black border-gray-600"
        >
          <div>
            <input
              type="text"
              name="cakeName"
              placeholder="Item Name"
              value={formData.cakeName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* <Dropdown /> */}

          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
              required
            ></textarea>
          </div>
          <div className="flex ">
            <span className="text-2xl py-2 pr-4">$</span>
            <input
              type="text"
              name="message"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="  text-green-400 font-bold text-2xl text-left  p-2 rounded-md hover:text-green-300 hover:cursor-pointer transition duration-300"
          >
            Upload
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminUploadScreen;
