"use client";

import { ApiResponse } from "@/helpers/apiResponse";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  WhatsApp?: string;
}

// Updated fields to reflect all string properties, excluding socialMediaLinks initially
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

const socialMediaPlatforms = [
  { label: "Facebook", key: "facebook" },
  { label: "Instagram", key: "instagram" },
  { label: "TikTok", key: "tiktok" },
  { label: "WhatsApp", key: "WhatsApp" },
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
  socialMediaLinks?: SocialMediaLinks;
  branchName?: string;
}

export default function BusinessEditor() {
  const [business, setBusiness] = useState<Partial<BusinessPayload>>({});
  const [loading, setLoading] = useState(false);

  const [newSocialMediaLink, setNewSocialMediaLink] = useState<{
    platform: keyof SocialMediaLinks | "";
    url: string;
  }>({ platform: "", url: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<BusinessPayload>>(
          `/api/about/fetchDetails`
        );
        setBusiness(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data!", {
          position: "top-center",
          icon: "❌",
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (key: keyof BusinessPayload, value: string) => {
    setBusiness((prev) => ({ ...prev, [key]: value }));
  };

  const handleSocialMediaChange = (
    platform: keyof SocialMediaLinks,
    url: string
  ) => {
    setBusiness((prev) => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [platform]: url },
    }));
  };

  const handleNewSocialMediaChange = (
    field: "platform" | "url",
    value: string
  ) => {
    setNewSocialMediaLink((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSocialMedia = async () => {
    if (!newSocialMediaLink.platform || !newSocialMediaLink.url) {
      toast.error("Please select a platform and enter a URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/about/updateDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editType: "socialMediaLinks",
          newData: {
            ...business.socialMediaLinks,
            [newSocialMediaLink.platform]: newSocialMediaLink.url,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to add social media link");
      const platformLabel =
        socialMediaPlatforms.find((p) => p.key === newSocialMediaLink.platform)
          ?.label || newSocialMediaLink.platform;
      toast.success(`${platformLabel} link added successfully!`, {
        position: "top-center",
        icon: "✅",
      });
      setBusiness((prev) => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [newSocialMediaLink.platform]: newSocialMediaLink.url,
        },
      }));
      setNewSocialMediaLink({ platform: "", url: "" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add social media link", {
        position: "top-center",
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSocialMedia = async (platform: keyof SocialMediaLinks) => {
    setLoading(true);
    try {
      const updatedLinks = { ...business.socialMediaLinks };
      delete updatedLinks[platform];

      const res = await fetch(`/api/about/updateDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          editType: "socialMediaLinks",
          newData: updatedLinks,
        }),
      });

      if (!res.ok) throw new Error("Failed to remove social media link");
      const platformLabel =
        socialMediaPlatforms.find((p) => p.key === platform)?.label || platform;
      toast.success(`${platformLabel} link removed successfully!`, {
        position: "top-center",
        icon: "✅",
      });
      setBusiness((prev) => ({ ...prev, socialMediaLinks: updatedLinks }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to remove social media link", {
        position: "top-center",
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (key: keyof BusinessPayload) => {
    if (!business || business[key] === undefined) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/about/updateDetails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editType: key, newData: business[key] }),
      });

      if (!res.ok) throw new Error(`Update for ${key} failed`);
      toast.success(
        `${fields.find((f) => f.key === key)?.label} updated successfully!`,
        {
          position: "top-center",
          icon: "✅",
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error(
        `Failed to update ${fields.find((f) => f.key === key)?.label}`,
        {
          position: "top-center",
          icon: "❌",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-gray-100 border-2 shadow-md rounded-lg overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Edit Business Information
          </h2>
          <div className="space-y-6">
            {fields.map(({ label, key }) => {
              const value = business[key as keyof BusinessPayload];
              if (typeof value !== "string" && typeof value !== "undefined")
                return null; // Skip non-string values
              return (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    id={key}
                    value={value || ""}
                    onChange={(e) =>
                      handleChange(key as keyof BusinessPayload, e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    onClick={() => handleSubmit(key as keyof BusinessPayload)}
                    disabled={loading}
                    className={`mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Updating..." : `Update ${label}`}
                  </button>
                </div>
              );
            })}

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Social Media Links
              </label>
              {business?.socialMediaLinks &&
                Object.entries(business.socialMediaLinks).map(
                  ([platform, url]) => (
                    <div
                      key={platform}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <span className="font-medium capitalize">
                        {socialMediaPlatforms.find((p) => p.key === platform)
                          ?.label || platform}
                        :
                      </span>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            platform as keyof SocialMediaLinks,
                            e.target.value
                          )
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <button
                        onClick={() =>
                          handleRemoveSocialMedia(
                            platform as keyof SocialMediaLinks
                          )
                        }
                        disabled={loading}
                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}

              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Add New Social Media Link
                </h3>
                <div className="flex space-x-2">
                  <select
                    value={newSocialMediaLink.platform}
                    onChange={(e) =>
                      handleNewSocialMediaChange("platform", e.target.value)
                    }
                    className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Platform</option>
                    {socialMediaPlatforms.map((platform) => (
                      <option key={platform.key} value={platform.key}>
                        {platform.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Social Media URL"
                    value={newSocialMediaLink.url}
                    onChange={(e) =>
                      handleNewSocialMediaChange("url", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    onClick={handleAddSocialMedia}
                    disabled={loading}
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
