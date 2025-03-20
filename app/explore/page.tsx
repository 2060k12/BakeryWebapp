"use client";
import { useState } from "react";
import Photos from "../components/Photos";
import { Videos } from "../components/Videos";
import SocialMedia from "../components/SocialMedia";
import CreateYourOwn from "../components/CreateYourOwn";

const Explore = () => {
  const [isSelected, setIsSelected] = useState("photos"); // Default state should match the initial UI

  return (
    <div className="px-32 py-16">
      {/* The navigation bar inside the explore page */}
      <nav className="flex space-x-8 text-2xl">
        <button
          className={` hover:cursor-pointer ${
            isSelected === "photos" ? "underline" : ""
          } ${isSelected === "photos" ? "font-bold" : ""}`}
          onClick={() => setIsSelected("photos")}
        >
          Photos
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
          className={` hover:cursor-pointer ${
            isSelected === "social" ? "underline" : ""
          } ${isSelected === "social" ? "font-bold" : ""}`}
          onClick={() => setIsSelected("social")}
        >
          Social Media
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
      <div className="mt-8">
        {isSelected === "photos" && <Photos />}
        {isSelected === "videos" && <Videos />}
        {isSelected === "social" && <SocialMedia />}
        {isSelected === "createYourOwn" && <CreateYourOwn />}
      </div>
    </div>
  );
};

export default Explore;
