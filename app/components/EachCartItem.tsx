import Image from "next/image";
import React from "react";

const EachCartItem = () => {
  //     <div className="col-span-4">
  //     {/* Shopping card heaging */}
  //     <div className="mb-8">
  //       <div className="flex justify-between text-xl font-bold ">
  //         <h2 className="text-left">Shopping Cart</h2>
  //         <h2 className="text-right">3 Items</h2>
  //       </div>
  //       <hr className="border-gray-300 mt-4 " />
  //     </div>
  //     {/* Products*/}

  //     <div className="grid grid-cols-6">
  //       <Image
  //         className="col-span-1 rounded-xl h-25 w-25"
  //         src={"/images/cake1.jpg"}
  //         height={200}
  //         width={200}
  //         alt="Cake"
  //       />

  //       <div className="col-span-2">
  //         <h3 className=" text-xl">Birthday Cake</h3>
  //         <h3 className="font-bold">Cake</h3>
  //         <button className="text-gray-600 text-sm hover:cursor-pointer">
  //           Remove
  //         </button>
  //       </div>

  //       {/* Quantity */}
  //       <div className="flex gap-6 mx-auto">
  //         <h1>-</h1>
  //         <h2>2</h2>
  //         <h1>+</h1>
  //       </div>

  //       {/* price */}
  //       <h3 className="text-right">$44.99</h3>

  //       {/* Total Price */}
  //       <h3 className="text-right">$44.99</h3>
  //     </div>
  //   </div>

  return (
    <div>
      <div className="grid grid-cols-6">
        <Image
          className="col-span-1 rounded-xl h-25 w-25"
          src={"/images/cake1.jpg"}
          height={200}
          width={200}
          alt="Cake"
        />

        <div className="col-span-2">
          <h3 className=" text-xl">Birthday Cake</h3>
          <h3 className="font-bold">Cake</h3>
          <button className="text-gray-600 text-sm hover:cursor-pointer">
            Remove
          </button>
        </div>

        {/* Quantity */}
        <div className="flex gap-6 mx-auto">
          <h1>-</h1>
          <h2>2</h2>
          <h1>+</h1>
        </div>

        {/* price */}
        <h3 className="text-right">$44.99</h3>

        {/* Total Price */}
        <h3 className="text-right">$44.99</h3>
      </div>
    </div>
  );
};

export default EachCartItem;
