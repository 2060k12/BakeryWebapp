import React from "react";
import EachDeliveryItem from "./EachDeliveryItem";

const ReadyForDelivery = () => {
  return (
    <div>
      <div className="bg-black min-w-3/5 rounded-xl">
        <h1 className="text-white text-2xl font-bold pl-4 py-4">
          Ready For Delivery
        </h1>

        <div className="flex-col space-y-4 pb-4">
          {/* Products  */}
          <EachDeliveryItem />
          <EachDeliveryItem />
          <EachDeliveryItem />
        </div>
      </div>
    </div>
  );
};

export default ReadyForDelivery;
