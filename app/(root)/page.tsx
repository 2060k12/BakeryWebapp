"use client";
import { useEffect, useState } from "react";
import { Videos } from "../components/Videos";
import CreateYourOwn from "../components/CreateYourOwn";
import ExploreScreen from "../components/Explore";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";

export interface PromoBannerResponse {
  promoCode: string;
  discount: number;
}

const Page = () => {
  const [isSelected, setIsSelected] = useState("photos");
  const [promotion, setPromotion] = useState<PromoBannerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchPromo = async () => {
    try {
      const res = await axios.get<ApiResponse<PromoBannerResponse>>(
        `/api/banner/fetch`
      );
      console.log("Promo:", res.data);

      if (res.data.success) {
        setPromotion(res.data.data);
        setLoading(false);
        return;
      } else {
        console.error("Promo fetch failed:", res.data.message);

        setPromotion(null);
      }
    } catch (error) {
      console.error("No promo:", error);
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className=" rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />

          <div className="fixed inset-0 flex items-center justify-center  z-50 h-full">
            <h1 className="text-4xl font-bold text-center mt-8">
              Explore Our Offerings
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Discover a world of flavors and creativity!
            </p>
          </div>
        </div>
      ) : (
        <div className="md:px-32 px-8 py-8 md:py-4">
          {/* ads banner */}
          {promotion && (
            <div className="relative border-2 h-48 my-10 p-8 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out">
              <strong className="text-4xl font-extrabold text-white drop-shadow-md">
                Promotion
              </strong>
              <p className="text-3xl font-semibold text-white mt-4 drop-shadow-md">
                {promotion.discount}% OFF
              </p>
              <p className="text-xl font-medium text-white mt-2 drop-shadow-md">
                Use Coupon:{" "}
                <span className="font-bold text-yellow-400">
                  {promotion.promoCode}
                </span>
              </p>

              {/* Limited Time Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-blue-700 rounded-full px-4 py-2 text-sm font-bold shadow-md">
                Limited Time
              </div>
            </div>
          )}

          {/* The navigation bar inside the explore page */}
          <nav className="flex md:space-x-8 space-x-2 md:text-2xl text-lg">
            <button
              className={` hover:cursor-pointer ${
                isSelected === "photos" ? "underline" : ""
              } ${isSelected === "photos" ? "font-bold" : ""}`}
              onClick={() => setIsSelected("photos")}
            >
              Explore
            </button>
            <button
              className={`hover:cursor-pointer ${
                isSelected === "videos" ? "underline" : ""
              } ${isSelected === "videos" ? "font-bold" : ""}`}
              onClick={() => setIsSelected("videos")}
            >
              Videos
            </button>

            <button
              className={`hover:cursor-pointer ${
                isSelected === "createYourOwn" ? "underline" : ""
              } ${isSelected === "createYourOwn" ? "font-bold" : ""} `}
              onClick={() => setIsSelected("createYourOwn")}
            >
              Create Your Own
            </button>
          </nav>
          {/* Conditional Rendering */}
          <div>
            {isSelected === "photos" && <ExploreScreen />}
            {isSelected === "videos" && <Videos />}
            {isSelected === "createYourOwn" && <CreateYourOwn />}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
