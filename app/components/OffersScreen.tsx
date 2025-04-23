"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";
import toast from "react-hot-toast";
import { PromoBannerResponse } from "../(root)/page";

interface promotion {
  id: string;
  code: string;
  discount: string;
  isActive: boolean;
  createdAt: string;
}
const OffersScreen = () => {
  const [openAddPromotion, setOpenAddPromotion] = useState(false);
  const [promos, setPromos] = useState<promotion[] | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");

  const baseUrl = process.env.BASE_URL || "";

  const [bannerPromotion, setBannerPromotion] =
    useState<PromoBannerResponse | null>(null);

  const fetchPromoBanner = async () => {
    try {
      const res = await axios.get<ApiResponse<PromoBannerResponse>>(
        `/api/banner/fetch`
      );
      console.log("Promo:", res.data);

      if (res.data.success) {
        setBannerPromotion(res.data.data);
        return;
      } else {
        console.error("Promo fetch failed:", res.data.message);

        setBannerPromotion(null);
      }
    } catch (error) {
      console.error("No promo:", error);
    }
  };

  // upload new promotion to database
  const addAewPromotion = async (reqData: {
    promoCode: string;
    discount: string;
  }) => {
    try {
      const res = await axios.post<ApiResponse<object>>(
        `${baseUrl}/api/promo/create`,

        {},
        {
          params: {
            promoCode: reqData.promoCode,
            discount: reqData.discount,
          },
        }
      );

      if (res.status == 200) {
        toast.success("New Promo Code added");
        fetchCurrentPromotions();
      } else {
        toast.error("Unable to add Promo ");
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  // fetch all current promotions
  const fetchCurrentPromotions = async () => {
    try {
      const res = await axios.get<ApiResponse<promotion[]>>(`/api/promo/fetch`);

      if (res.status == 200) {
        setPromos(res.data.data);
      } else {
        toast.error("Unable to add Promo ");
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  // remove promotion
  const removePromotion = async (promoCode: string) => {
    try {
      const res = await axios.delete<ApiResponse<object>>(`/api/promo/delete`, {
        params: {
          promoCode: promoCode,
        },
      });

      if (res.status == 200) {
        toast.success("Promo Code deleted");
      } else {
        toast.error("Unable to delete Promo ");
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  // update a promotion
  const updateCurrentPromotion = async (
    promoCode: string,
    discount: string
  ) => {
    try {
      const res = await axios.patch<ApiResponse<object>>(
        `${baseUrl}/api/promo/update/`,
        {
          params: {
            promoCode: promoCode,
            discount: discount,
          },
        }
      );

      if (res.status == 200) {
        toast.success("Promo Code updated");
        fetchCurrentPromotions();
      } else {
        toast.error("Unable to delete Promo ");
      }
    } catch (error) {
      toast.error("Something went wrong" + error);
    }
  };

  useEffect(() => {
    fetchCurrentPromotions();
    fetchPromoBanner();
  }, []);

  async function handleRemoveBannerPromotion() {
    try {
      const res = await axios.delete<ApiResponse<object>>(`/api/banner/delete`);

      if (res.data.success) {
        setBannerPromotion(null);
        fetchPromoBanner();
        return;
      }
    } catch (error) {
      console.error("No promo:", error);
    }
  }

  async function handleAddToBannerPromotion(promoCode: string) {
    console.log("Promo Code:", promoCode);
    try {
      const res = await axios.post<ApiResponse<object>>(
        `/api/banner/create`,
        {},
        {
          params: {
            promoCode: promoCode,
          },
        }
      );

      if (res.status == 200) {
        toast.success("Promo Code added to banner");
        fetchPromoBanner();
        return;
      }
    } catch (error) {
      console.error("No promo:", error);
    }
  }

  return (
    <>
      {openAddPromotion && (
        <div className=" bg-black w-full grid  grid-cols-7 ">
          <div className="flex  flex-col space-y-4 col-span-6">
            <h1 className="text-2xl font-bold mb-3">New Promotion</h1>
            <input
              className="border border-gray-400  w-9/10 text-xl py-2 px-4 rounded-2xl"
              type="text"
              name="code"
              placeholder="Promo Code"
              id="promoCode"
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <input
              className="border border-gray-400  w-9/10 text-xl py-2 px-4 rounded-2xl"
              type="text"
              name="discount"
              placeholder="Discount Percentage"
              id="promoCode"
              onChange={(e) => setDiscount(e.target.value)}
            />
            <button
              onClick={async () => {
                if (!discount || !promoCode) {
                  toast.error(
                    "Please add both promocde and discount percentage"
                  );
                  return;
                }
                await addAewPromotion({
                  discount: discount,
                  promoCode: promoCode,
                });
              }}
              className="text-xl font-bold text-white bg-blue-400 w-9/10 py-2 rounded-2xl hover:cursor-pointer"
            >
              Upload
            </button>
          </div>

          <div
            className="h-full bg-red-400 my-4 rounded-2xl col-span-1 p-4 m-auto flex items-center justify-center hover:bg-red-300 hover:cursor-pointer"
            onClick={() => {
              setOpenAddPromotion(false);
            }}
          >
            <span className="text-xl">Close</span>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-white bg-black p-4">
          All Coupens
        </h1>
        <div className="grid grid-cols-3">
          {promos?.map((item) => (
            <div
              key={item.id}
              className="border-2 border-black rounded-2xl p-4 m-4 bg-black"
            >
              <button
                className="bg-blue-400 mb-4 w-full p-2  hover:cursor-pointer hover:bg-blue-300"
                onClick={() => {
                  handleAddToBannerPromotion(item.code);
                }}
              >
                Set as Banner Promotion
              </button>

              <h1 className="text-xl">
                Code: <span className="underline">{item.code}</span>
              </h1>
              <h1>Discount Percentage: {item.discount}%</h1>
              <h1> Created On: {item.createdAt}</h1>
              <div className="flex flex-row justify-between gap-3">
                {/*update button */}
                <button
                  onClick={() => {
                    updateCurrentPromotion(item.code, item.discount);
                  }}
                  className="bg-green-500 w-full p-2 mt-3 rounded-2xl hover:cursor-pointer hover:bg-green-300"
                >
                  Update
                </button>
                {/* delete button */}
                <button
                  onClick={() => {
                    removePromotion(item.code);
                  }}
                  className="bg-red-400 w-full p-2 mt-3 rounded-2xl hover:cursor-pointer hover:bg-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setOpenAddPromotion(true);
          }}
          className="text-2xl font-bold text-white bg-green-400 w-10/11 py-4 m-8 rounded-xl hover:cursor-pointer"
        >
          Add New Promotion
        </button>
      </div>

      {bannerPromotion && (
        <div className="border-2 p-4 flex w-full justify-between">
          <div>
            <strong className="text-xl font-extrabold text-white drop-shadow-md">
              Promotion
            </strong>
            <p className="text-xl font-semibold text-white mt-2 drop-shadow-md">
              {bannerPromotion.discount}% OFF
            </p>
            <p className="text-xl font-medium text-white  drop-shadow-md">
              Use Coupon:{" "}
              <span className="font-bold text-yellow-400">
                {bannerPromotion.promoCode}
              </span>
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                handleRemoveBannerPromotion();
              }}
              className="bg-red-400  h-full w-full p-2  rounded-2xl hover:cursor-pointer hover:bg-red-300"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OffersScreen;
