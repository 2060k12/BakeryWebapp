"use client";
import AdminUploadScreen from "@/app/components/AdminUploadScreen";
import AdminVideoScreen from "@/app/components/AdminVideoScreen";
import EditScreen from "@/app/components/EditScreen";
import NotificationScreen from "@/app/components/NotificationScreen";
import OffersScreen from "@/app/components/OffersScreen";
import OrderScreen from "@/app/components/OrderScreen";
import SettingScreen from "@/app/components/SettingScreen";
import React, { useState } from "react";

const Page = () => {
  const [currentScreen, setCurrentScreen] = useState("upload");

  const handleOnClickNav = (toScreen: string) => {
    setCurrentScreen(toScreen);
  };

  return (
    <div className="grid grid-cols-4 ">
      <div className="flex flex-col bg-black text-white font-bold text-xl col-span-1 py-8 px-4 rounded-sm ">
        <ul className="p-4 space-y-4  ">
          <li
            className="hover:cursor-pointer hover:underline"
            onClick={() => handleOnClickNav("home")}
          >
            Home
          </li>
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
            onClick={() => handleOnClickNav("notification")}
          >
            Notifications
          </li>

          <li
            className="hover:cursor-pointer hover:underline"
            onClick={() => handleOnClickNav("videos")}
          >
            Manage Videos
          </li>
        </ul>
      </div>
      <div className="col-span-3 bg-gray-900 ml-4 rounded-sm">
        <div>{currentScreen === "upload" && <AdminUploadScreen />}</div>
        <div>{currentScreen === "offers" && <OffersScreen />}</div>
        <div>{currentScreen === "edit" && <EditScreen />}</div>
        <div>{currentScreen === "settings" && <SettingScreen />}</div>
        <div>{currentScreen === "orders" && <OrderScreen />}</div>
        <div>{currentScreen === "notification" && <NotificationScreen />}</div>
        <div>{currentScreen === "videos" && <AdminVideoScreen />}</div>
      </div>
    </div>
  );
};

export default Page;
