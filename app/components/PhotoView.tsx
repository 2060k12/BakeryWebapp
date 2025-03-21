import Image from "next/image";
import React from "react";

interface PhotoViewProps {
  image: string;
  imageAlt: string;
}

const PhotoView: React.FC<PhotoViewProps> = ({ image, imageAlt }) => {
  return (
    <div className="flex justify-center hover:cursor-pointer  ">
      <Image
        src={image}
        alt={imageAlt}
        width={200}
        height={200}
        className="rounded-2xl shadow-xl object-cover transform transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default PhotoView;
