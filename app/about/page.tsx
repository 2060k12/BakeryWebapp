"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/helpers/apiResponse";
import toast from "react-hot-toast";

interface BusinessPayload {
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
  isActive: boolean;
}

export default function Page() {
  const [business, setBusiness] = useState<BusinessPayload | null>(null);
  const fetchData = async () => {
    const baseUrl = process.env.BASE_URL || "";
    try {
      const response = await axios.get<ApiResponse<BusinessPayload>>(
        `${baseUrl}/api/about/fetchDetails`
      );
      setBusiness(response.data.data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="md:px-44 px-8 pt-18 pb-8">
        <h1 className="font-bold text-3xl">About Us</h1>
        <p>{business?.description}</p>
      </div>
      <Image
        src={business?.imageUrl ? business?.imageUrl : "/images/banner.jpg"}
        width={500}
        height={500}
        alt="banner"
        className="aspect-video w-full h-80 md:px-44 px-8 object-cover"
      />
      <div className="flex md:flex-row flex-col place-content-between md:px-44 px-8 py-8 md:py16">
        <div>
          <h3 className="font-bold text-3xl">Contact Info</h3>
          <div className="text-xl">
            <h4>{business?.phoneNumber}</h4>
            <h4>{business?.email}</h4>
            <h4>{business?.address}</h4>
          </div>
        </div>
        <hr className="border-gray-700 border-1 my-3 md:hidde" />
        <div>
          <h3 className="font-bold text-3xl ">We are available on</h3>
          <div className="text-xl md:text-right font-bold">
            <div className="text-xl md:text-right font-bold">
              {business?.socialMediaLinks ? (
                Object.entries(business.socialMediaLinks).map(
                  ([platform, link]) => (
                    <h4 key={platform}>
                      <a
                        href={`https://${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:cursor-pointer hover:underline"
                      >
                        {platform}
                      </a>
                    </h4>
                  )
                )
              ) : (
                <h4>No social media available</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
