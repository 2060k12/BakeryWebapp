"use client";
import React, { useState } from "react";
import PhotoView from "../components/PhotoView";
import Image from "next/image";

const Explore = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // handle opening the model with a selcted image
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="px-32 py-16">
      {/* The navigation bar inside the explore page */}
      <nav className="flex space-x-8 text-2xl">
        <h3 className="font-bold underline">Photos</h3>
        <h3>videos</h3>
        <h3>SocialMedia</h3>
        <h3>CreateYourOwn</h3>
      </nav>

      {/* This is the explore page Feed */}
      <div className="flex flex-wrap gap-6 my-12 justify-center ">
        <PhotoView
          image="/images/cake1.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake1.jpg")}
        />
        <PhotoView
          image="/images/cake2.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake2.jpg")}
        />
        <PhotoView
          image="/images/cake3.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake3.jpg")}
        />
        <PhotoView
          image="/images/cake4.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake4.jpg")}
        />
        <PhotoView
          image="/images/cake5.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake5.jpg")}
        />
        <PhotoView
          image="/images/cake6.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake6.jpg")}
        />
        <PhotoView
          image="/images/cake7.jpg"
          imageAlt="Sample Image"
          onClick={() => openModal("/images/cake7.jpg")}
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
          {" "}
          <div className="flex bg-white rounded-4xl max-w-7xl mx-auto   ">
            <div className="flex justify-between items-center "></div>
            <Image
              src={selectedImage}
              alt="Selected"
              className="rounded-4xl"
              width={350}
              height={400}
            />

            {/* description  section */}
            <div className=" grid grid-row-2 px-10 py-8 mt-2 content-between">
              <div>
                {/* Titile and close button */}
                <div className="grid grid-cols-6 content-between ">
                  <h4 className=" font-bold text-3xl col-span-4 ">
                    Birthday Cake
                  </h4>

                  <div className="flex justify-end col-span-2">
                    <button
                      onClick={closeModal}
                      className=" text-2xl font-bold text-black hover:cursor-pointer "
                    >
                      X
                    </button>
                  </div>
                </div>
                {/* Diatery Options */}

                <div className="mt-8">
                  <h4 className="font-bold"> Diatery Options</h4>
                  <h4 className="font-bold"> Vegan - Plant based</h4>
                  <h4 className="font-bold"> Contains eggs</h4>
                  <h4 className="font-bold"> Lactos Free - No dariy</h4>
                </div>
              </div>
              {/* Order Now Button */}
              <div>
                <button
                  onClick={closeModal}
                  className="text-3xl font-bold text-green-500 hover:cursor-pointer "
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
