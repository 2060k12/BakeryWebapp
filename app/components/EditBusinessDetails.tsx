"use client";

import { ApiResponse } from "@/helpers/apiResponse";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// Updated fields to reflect only the string properties from BusinessPayload
const fields = [
  { label: "Name", key: "name" },
  { label: "Branch Name", key: "branchName" },
  { label: "Address", key: "address" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Email", key: "email" },
  { label: "Description", key: "description" },
  { label: "Image URL", key: "imageUrl" },
  { label: "Opening Time", key: "openingTime" },
  { label: "Closing Time", key: "closingTime" },
];

export interface BusinessPayload {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  description: string;
  imageUrl: string;
  openingTime: string;
  closingTime: string;
  socialMediaLinks: string | null;
  branchName: string | null;
}

export default function BusinessEditor() {
  const [business, setBusiness] = useState<Partial<BusinessPayload>>({}); // Using Partial to allow for partial updates
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<BusinessPayload>>(
          `/api/about/fetchDetails`
        );
        setBusiness(response.data.data); // Populate initial values
        console.log("-------------------------------");
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("Failed to fetch data!", {
          position: "top-center",
          icon: "❌",
        });
      }
    };

    fetchData();
  }, []);

  // Explicitly type 'key' as keyof BusinessPayload
  const handleChange = (key: keyof BusinessPayload, value: string) => {
    setBusiness((prev) => ({ ...prev, [key]: value }));
  };

  // Explicitly type 'key' as keyof BusinessPayload
  const handleSubmit = async (key: keyof BusinessPayload) => {
    if (!business) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/about/updateDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editType: key, newData: business[key] }),
      });

      if (!res.ok) throw new Error("Update failed");
      toast.success(`${key} updated successfully!`);
    } catch (err) {
      toast.error(`Failed to update ${key}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Edit Business Info</h2>
      {fields.map(({ label, key }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="font-medium">{label}</label>
          <input
            type="text"
            value={business[key as keyof BusinessPayload] || ""} // Type cast the key to keyof BusinessPayload
            onChange={(e) =>
              handleChange(key as keyof BusinessPayload, e.target.value)
            } // Type cast the key to keyof BusinessPayload
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => handleSubmit(key as keyof BusinessPayload)} // Type cast the key to keyof BusinessPayload
            disabled={loading}
            className="mt-1 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Update {label}
          </button>
        </div>
      ))}
    </div>
  );
}
