import Image from "next/image";
import React from "react";

interface PhotoViewProps {
  image: string;
  imageAlt: string;
  onClick?: () => void;
}

const PhotoView: React.FC<PhotoViewProps> = ({ image, imageAlt, onClick }) => {
  return (
    <div
      className="flex justify-center hover:cursor-pointer  "
      onClick={onClick}
    >
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
