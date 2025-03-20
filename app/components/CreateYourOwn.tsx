import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
const CreateYourOwn = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Cake order submitted successfully!");
  };

  return (
    <div className="grid grid-cols-4">
      {/* Cake Reference Section */}
      <section className="flex flex-col col-span-2 hover:cursor-pointer">
        <div className="bg-gray-200 rounded-xl w-90 aspect-square flex justify-center items-center">
          <div className="flex-col">
            <IoCloudUploadOutline className="text-4xl m-auto" />
            <span className="image">Upload Cake Reference </span>
          </div>
        </div>
      </section>

      {/* Text Field Section */}
      <section className="flex flex-col col-span-2">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto p-5 border rounded-xl shadow-lg space-y-4 bg-white"
        >
          <div>
            <input
              type="text"
              name="cakeName"
              placeholder="Give your cake name"
              value={formData.cakeName}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Describe any special requests or design preferences"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="  text-green-400 font-bold text-2xl text-left  p-2 rounded-md hover:text-green-300 hover:cursor-pointer transition duration-300"
          >
            Submit Order
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateYourOwn;
