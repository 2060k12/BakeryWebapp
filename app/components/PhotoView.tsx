import Image from "next/image";
import React from "react";
import { Item } from "./Photos";

interface PhotoViewProps {
  imageAlt: string;
  onClick?: () => void;
  item: Item;
}

const PhotoView: React.FC<PhotoViewProps> = ({ imageAlt, onClick, item }) => {
  return (
    <div
      className="flex justify-center hover:cursor-pointer  "
      onClick={onClick}
    >
      <Image
        src={item.itemImage ? item.itemImage : "/images/cake1.jpg"}
        alt={imageAlt}
        width={200}
        height={200}
        className="rounded-2xl shadow-xl object-cover transform transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

export default PhotoView;
