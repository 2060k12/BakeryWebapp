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
      className="flex flex-col justify-center hover:cursor-pointer  "
      onClick={onClick}
    >
      <Image
        src={item.itemImage ? item.itemImage : "/images/cake1.jpg"}
        alt={imageAlt}
        width={192} // 48 * 4 = 192px
        height={208} // 52 * 4 = 208px
        className="rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 w-48 h-80 object-cover"
      />
      <div className="flex justify-center mt-2">
        <h4 className="text-lg ">{item.name}</h4>
      </div>
    </div>
  );
};

export default PhotoView;
