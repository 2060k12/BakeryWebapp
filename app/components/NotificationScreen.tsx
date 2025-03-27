import React from "react";

const NotificationScreen = () => {
  return (
    <div>
      <div className="mx-4 my-8 hover: cursor-pointer space-y-3">
        <div className="  px-4 bg-black py-4 text-white rounded-sm">
          <div className="flex justify-between text-xl">
            <h2>A New Order has been placed </h2>
            <h2>#77677</h2>
          </div>

          <div className="flex justify-between">
            <h3>Delivery Location : 1 xyz parade, Capmsie </h3>
            <h3>Delevery Date : 26 Mar, 2025 </h3>
          </div>
        </div>
        <div className="  px-4 bg-black py-4 text-white rounded-sm">
          <div className="flex justify-between text-xl">
            <h2>A New Order has been placed </h2>
            <h2>#77677</h2>
          </div>

          <div className="flex justify-between">
            <h3>Delivery Location : 1 xyz parade, Capmsie </h3>
            <h3>Delevery Date : 26 Mar, 2025 </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
