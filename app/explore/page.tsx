"use client";
import { useState } from "react";
import Photos from "../components/Photos";
import { Videos } from "../components/Videos";
import CreateYourOwn from "../components/CreateYourOwn";

const Explore = () => {
  const [isSelected, setIsSelected] = useState("photos");

  return (
    <div className="md:px-32 px-8 py-8 md:py-16">
      {/* The navigation bar inside the explore page */}
      <nav className="flex md:space-x-8 space-x-2 md:text-2xl text-lg">
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
        {/* <button
          className={` hover:cursor-pointer ${
            isSelected === "social" ? "underline" : ""
          } ${isSelected === "social" ? "font-bold" : ""}`}
          onClick={() => setIsSelected("social")}
        >
          Social Media
        </button> */}
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
        {/* {isSelected === "social" && <SocialMedia />} */}
        {isSelected === "createYourOwn" && <CreateYourOwn />}
      </div>
    </div>
  );
};

export default Explore;
