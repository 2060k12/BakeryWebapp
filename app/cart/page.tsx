import React from "react";
import EachCartItem from "../components/EachCartItem";

const Cart = () => {
  return (
    <div>
      <div className="grid grid-cols-6 gap-16">
        {/* Producs */}
        {/* Product 1 */}
        <div className="col-span-4 ">
          {/* Shopping card heaging */}
          <div className="mb-8">
            <div className="flex justify-between text-xl font-bold ">
              <h2 className="text-left">Shopping Cart</h2>
              <h2 className="text-right">3 Items</h2>
            </div>
            <hr className="border-gray-300 mt-4 " />
          </div>

          {/* Products*/}
          <div className="flex-row space-y-4">
            <EachCartItem />
            <EachCartItem />
            <EachCartItem />
          </div>
        </div>

        {/* Order summary */}

        <div className="col-span-2">
          <div className="mb-4">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-xl font-bold">Order Sumary</h1>
              <hr className=" border-gray-300 mt-4" />
            </div>
            <div className="flex justify-between">
              <h3>Items - 3</h3>
              <h3>$44.99</h3>
            </div>
          </div>

          <h3>Shipping</h3>
          <button className="w-full text-left bg-green-600 p-2 text-white text-lg rounded-sm mb-4">
            Standard Delivery - $5.00{" "}
          </button>

          {/* promo code */}
          <h3>Promo Code</h3>
          <div className="flex justify-between gap-2">
            <input
              type="text"
              placeholder="Enter your code"
              className="py-2 px-4 rounded-sm border-2 w-full"
            />

            <button className="bg-green-600 text-white py-2 px-4 rounded-sm">
              Apply
            </button>
          </div>

          <hr className="border-gray-300 my-4 " />

          <div className="flex-row ">
            <div className="flex justify-between ">
              <h3 className="font-bold">TOTAL COST</h3>
              <h3>$ 49.99</h3>
            </div>

            <button className="mt-3 w-full bg-blue-600 text-xl border-2 text-white p-4 rounded-sm hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
