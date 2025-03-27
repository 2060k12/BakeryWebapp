import React from "react";

const OrderScreen = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl">Pending Orders</h2>

      {/* Each Pending Orders */}

      <div className="grid grid-cols-2 gap-x-3 space-y-4">
        {/* Order 1 */}
        <div className=" bg-black text-white rounded-sm p-3">
          <div className="flex justify-between">
            <h2>Birthday Cake</h2>
            <h2># 44345</h2>
          </div>
          <div className="flex justify-between">
            <h2>1 xyz street, Campsie, 2194</h2>
            <h2>28 Mar, 2025</h2>
          </div>
          <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
            View Details
          </button>
        </div>
        {/* Order 2 */}
        <div className=" bg-black text-white rounded-sm p-4">
          <div className="flex justify-between">
            <h2>Birthday Cake</h2>
            <h2># 44345</h2>
          </div>
          <div className="flex justify-between">
            <h2>1 xyz street, Campsie, 2194</h2>
            <h2>28 Mar, 2025</h2>
          </div>
          <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
            View Details
          </button>
        </div>
        {/* Order 3 */}
        <div className=" bg-black text-white rounded-sm p-4">
          <div className="flex justify-between">
            <h2>Birthday Cake</h2>
            <h2># 44345</h2>
          </div>
          <div className="flex justify-between">
            <h2>1 xyz street, Campsie, 2194</h2>
            <h2>28 Mar, 2025</h2>
          </div>
          <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
            View Details
          </button>
        </div>
      </div>

      <h2 className="text-xl my-4">On-going Orders</h2>
      <div className="grid grid-cols-2 gap-x-3 space-y-4">
        {/* Order 1 */}
        <div className=" bg-black text-white rounded-sm p-4">
          <div className="flex justify-between">
            <h2>Birthday Cake</h2>
            <h2># 44345</h2>
          </div>
          <div className="flex justify-between">
            <h2>1 xyz street, Campsie, 2194</h2>
            <h2>28 Mar, 2025</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              View Details
            </button>
            <button className="text-xl bg-green-600 border-2 border-green-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              Ready For delivery
            </button>
          </div>
        </div>
        {/* Order 2 */}
        <div className=" bg-black text-white rounded-sm p-4">
          <div className="flex justify-between">
            <h2>Birthday Cake</h2>
            <h2># 44345</h2>
          </div>
          <div className="flex justify-between">
            <h2>1 xyz street, Campsie, 2194</h2>
            <h2>28 Mar, 2025</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              View Details
            </button>
            <button className="text-xl bg-green-600 border-2 border-green-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              Ready For delivery
            </button>
          </div>
        </div>
        {/* Order 3 */}
        <div className=" bg-black text-white rounded-sm p-4">
          <div className="flex justify-between">
            <h2>Birthday Cake</h2>
            <h2># 44345</h2>
          </div>
          <div className="flex justify-between">
            <h2>1 xyz street, Campsie, 2194</h2>
            <h2>28 Mar, 2025</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="text-xl bg-black-600 border-2 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              View Details
            </button>
            <button className="text-xl bg-green-600 border-2 border-green-600 text-white p-2 rounded-sm hover:cursor-pointer  hover:bg-green-500 hover:border-green-500 mt-3 w-full">
              Ready For delivery
            </button>
          </div>
        </div>
      </div>

      {/* View previous orders when this button is pressed */}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button className="text-xl bg-blue-600 text-white p-4 rounded-sm hover:cursor-pointer hover:bg-blue-500">
          Ready For Delivery
        </button>
        <button className="text-xl border-2 text-white p-4 rounded-sm hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500">
          Previous Orders
        </button>
      </div>
    </div>
  );
};

export default OrderScreen;
