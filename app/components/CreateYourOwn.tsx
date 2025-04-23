"use client";
import React, { useCallback, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import toast from "react-hot-toast";

export type CustomOrder = {
  itemImage: string;
  name: string;
  description: string;
  message: string;
  price: number;
};

const CreateYourOwn = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

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

  const [formData, setFormData] = useState({
    cakeName: "",
    message: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Upload a cake reference image first");
      return;
    }

    try {
      // Get signed URL for the image upload
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

      // Upload the image to S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      // Get the public image URL
      const uploadedImageUrl = uploadUrl.split("?")[0];

      // 4. Save order in localStorage
      const customOrder: CustomOrder = {
        name: formData.cakeName,
        message: formData.message,
        description: formData.description,
        itemImage: uploadedImageUrl,
        price: 50,
      };

      const existingOrders: CustomOrder[] = JSON.parse(
        localStorage.getItem("customOrders") || "[]"
      );

      existingOrders.push(customOrder);
      localStorage.setItem("customOrders", JSON.stringify(existingOrders));

      toast.success("Custom order saved!");

      //  Reset form and image preview
      setFormData({
        cakeName: "",
        message: "",
        description: "",
      });
      setImagePreview(null);
      setFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="grid grid-cols-4 mt-10">
      {/* Cake Reference Section */}
      <section className="flex flex-col col-span-2">
        <div
          {...getRootProps()}
          className="bg-gray-800 rounded-xl w-full h-full aspect-square flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 hover:bg-gray-300 transition"
        >
          <input {...getInputProps()} />
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Cake Reference"
              height={200}
              width={200}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center">
              <IoCloudUploadOutline className="text-4xl text-gray-600" />
              <span className="text-gray-600 text-sm">
                Upload Cake Reference
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Text Field Section */}
      <section className="flex flex-col col-span-2">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto p-5 h-full rounded-xl shadow-lg space-y-4 bg-black border-2 border-gray-700 flex flex-col justify-between "
        >
          <div className="space-y-2">
            <div>
              <input
                type="text"
                name="cakeName"
                placeholder="Give your cake name"
                value={formData.cakeName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <input
                type="text"
                name="message"
                placeholder="Your message on the cake"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Describe any special requests or design preferences"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={4}
                required
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-green-500 font-bold text-2xl text-left p-2 rounded-md hover:text-green-300 hover:cursor-pointer transition duration-300"
          >
            Submit Order
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateYourOwn;
