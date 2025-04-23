"use client";
import AdminUploadScreen from "@/app/components/AdminUploadScreen";
import AdminVideoScreen from "@/app/components/AdminVideoScreen";
import EditScreen from "@/app/components/EditScreen";
import NotificationScreen from "@/app/components/NotificationScreen";
import OffersScreen from "@/app/components/OffersScreen";
import OrderScreen from "@/app/components/OrderScreen";
import SettingScreen from "@/app/components/SettingScreen";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [currentScreen, setCurrentScreen] = useState("upload");
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClickNav = (toScreen: string) => {
    setCurrentScreen(toScreen);
  };

  const validateToken = async (token: string) => {
    try {
      const res = await axios.get("/api/admin/validateToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        localStorage.removeItem("token");
        window.location.href = "/admin/auth";
      }
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/admin/auth";

      console.error("Error validating token:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin/auth";
    } else {
      validateToken(token);

      setIsLoading(false);
    }
  });

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
        </div>
      ) : (
        <div className="grid grid-cols-4 ">
          <div className="flex flex-col bg-black text-white font-bold text-xl col-span-1 py-8 px-4 rounded-sm ">
            <ul className="p-4 space-y-4  ">
              <li
                className="hover:cursor-pointer hover:underline"
                onClick={() => handleOnClickNav("settings")}
              >
                Settings
              </li>
              <li
                className="hover:cursor-pointer hover:underline"
                onClick={() => handleOnClickNav("edit")}
              >
                Edit
              </li>
              <li
                className="hover:cursor-pointer hover:underline"
                onClick={() => handleOnClickNav("offers")}
              >
                Offers/ Promotion
              </li>
              <li
                className="hover:cursor-pointer hover:underline"
                onClick={() => handleOnClickNav("upload")}
              >
                Upload
              </li>
              <li
                className="hover:cursor-pointer hover:underline"
                onClick={() => handleOnClickNav("orders")}
              >
                Orders
              </li>

              <li
                className="hover:cursor-pointer hover:underline"
                onClick={() => handleOnClickNav("videos")}
              >
                Manage Videos
              </li>

              <li
                className="hover:cursor-pointer hover:underline color-red-500"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/admin/auth";
                }}
              >
                Logout
              </li>
            </ul>
          </div>
          <div className="col-span-3 bg-gray-900 ml-4 rounded-sm">
            <div>{currentScreen === "upload" && <AdminUploadScreen />}</div>
            <div>{currentScreen === "offers" && <OffersScreen />}</div>
            <div>{currentScreen === "edit" && <EditScreen />}</div>
            <div>{currentScreen === "settings" && <SettingScreen />}</div>
            <div>{currentScreen === "orders" && <OrderScreen />}</div>
            <div>
              {currentScreen === "notification" && <NotificationScreen />}
            </div>
            <div>{currentScreen === "videos" && <AdminVideoScreen />}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
