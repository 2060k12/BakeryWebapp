"use client";
import React, { useEffect } from "react";
import EachCartItem from "../components/EachCartItem";
import { CustomOrder } from "../components/CreateYourOwn";
import { Item } from "@/db/models/ItemModel";
import axios from "axios";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import toast from "react-hot-toast";
import EachCustomCartItem from "../components/EachCustomCartItem";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/helpers/store";
import { nanoid } from "nanoid";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@heroui/date-picker";
export interface Customer {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  addressDescription: string;
  identityProof: string;
}

export interface OrderItem {
  id: string;
}

export interface Order {
  appliedPromo: string;
  orderName: string;
  deliveryDate: string; // ISO 8601 date string
  discount: number;
  GrossPrice: number;
  deliveryCharge: number;
  proofScreenshot: string;
  customer: Customer;
  items: OrderItem[];
  customOrders: CustomOrder[];
}
const Cart = () => {
  const [discount, setDiscount] = React.useState<number | null>(null);
  const [promoCode, setPromoCode] = React.useState("");
  const [grossPrice, setGrossPrice] = React.useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = React.useState<number>(5);
  const [loading, setLoading] = React.useState(true);
  const [cartItems, setCartItems] = React.useState<Item[]>();
  const [customItem, setCustomItems] = React.useState<CustomOrder[]>();
  const [totalCost, setTotalCost] = React.useState<number>(0);
  const getCustomOrders = (): CustomOrder[] => {
    return JSON.parse(localStorage.getItem("customOrders") || "[]");
  };
  const tomorrow = today(getLocalTimeZone()).add({ days: 1 });
  const router = useRouter();
  const handleCheckPromoCode = async (promo: string) => {
    if (!promo) {
      toast.error("Please enter a promo code");
      return;
    }
    try {
      const response = await axios.get<
        ApiResponse<{
          discountPercentage: number;
        }>
      >(`/api/promo/check?promoCode=${promo}`);
      if (response.status === 200) {
        setDiscount(response.data.data.discountPercentage);
        const promoData = response.data.data;
        toast.success(
          `Promo code ${promo} applied! You get a discount of ${promoData.discountPercentage}%`
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Discount coupen not found.");
      }
    }
  };

  const getCartItems = (): Item[] => {
    return JSON.parse(localStorage.getItem("cartItems") || "[]");
  };

  useEffect(() => {
    setDeliveryCharge(5);
    setCartItems(getCartItems());
    setCustomItems(getCustomOrders());
  }, []);

  useEffect(() => {
    const items = getCartItems();
    const customOrders = getCustomOrders();

    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    const customPrice = customOrders.reduce((acc, item) => acc + item.price, 0);
    const discountAmount = discount ? (totalPrice * discount) / 100 : 0;
    const totalPriceWithDiscount = totalPrice - discountAmount;
    setGrossPrice(totalPrice + customPrice);
    setTotalCost(totalPriceWithDiscount + customPrice + deliveryCharge);
    setLoading(false);
  }, [cartItems, customItem, deliveryCharge, discount]);

  const createOrder: Order = {
    appliedPromo: promoCode,
    deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    deliveryCharge: deliveryCharge || 0,
    discount: discount || 0,
    GrossPrice: grossPrice,
    proofScreenshot: "",
    customer: {
      name: "",
      address: "",
      phoneNumber: "",
      email: "",
      addressDescription: "",
      identityProof: "",
    },
    items: cartItems || [],
    customOrders: customItem || [],
    orderName: nanoid().slice(0, 8),
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center  z-50 h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
        </div>
      ) : (
        <div>
          <div className="md:grid md:grid-cols-6 gap-16 mx-4 md:mx-0">
            {/* Producs */}
            {/* Product 1 */}
            <div className="col-span-4 ">
              {/* Shopping card heaging */}
              <div className="my-8">
                <div className="flex justify-between text-xl font-bold ">
                  <h2 className="text-left">Shopping Cart</h2>
                  <h2 className="text-right">
                    {cartItems?.length || 0 + (customItem?.length || 0)} Items
                  </h2>
                </div>
                <hr className="border-gray-300 mt-4 " />
              </div>

              {/* Empty cart */}
              {cartItems?.length === 0 && customItem?.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64">
                  <h2 className="text-2xl font-bold">Your cart is empty</h2>
                  <p className="text-gray-500">
                    Add items to your cart to see them here.
                  </p>
                </div>
              )}

              {/* Products*/}
              <div className="flex-row space-y-4 ">
                {cartItems?.map((item, index) => (
                  <div key={item.id}>
                    <EachCartItem order={item} />
                    <div className="flex gap-4 ">
                      <button
                        onClick={() => {
                          const updatedCartItems = cartItems?.filter(
                            (_, i) => i !== index
                          );
                          setCartItems(updatedCartItems);
                          localStorage.setItem(
                            "cartItems",
                            JSON.stringify(updatedCartItems)
                          );
                        }}
                        className="text-gray-600 text-lg hover:cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {customItem?.map((item, index) => (
                  <div key={index}>
                    <EachCustomCartItem order={item} />
                    <button
                      onClick={() => {
                        const updatedCustomOrders = customItem?.filter(
                          (_, i) => i !== index
                        );
                        setCustomItems(updatedCustomOrders);

                        localStorage.setItem(
                          "customOrders",
                          JSON.stringify(updatedCustomOrders)
                        );
                      }}
                      className="text-gray-600 text-sm hover:cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary */}

            <div className="md:col-span-2 mt-8 md:mt:0 w-full">
              <div className="mb-4">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-xl font-bold">Order Summary</h1>

                  <hr className=" border-gray-300 mt-4" />
                </div>
                <div className="flex justify-between">
                  <h3>
                    Items - {cartItems?.length || 0 + (customItem?.length || 0)}
                  </h3>
                  <h3>${grossPrice.toFixed(2)}</h3>
                </div>
              </div>
              <h3>Shipping</h3>
              <DatePicker
                defaultValue={tomorrow}
                className="max-w-[284px] "
                minValue={tomorrow}
                onChange={(date) => {
                  if (date) {
                    createOrder.deliveryDate = date.toString();
                  }
                }}
                label="Delivery Date"
              />
              <button className="w-full text-left bg-green-600 p-2 text-white text-lg rounded-sm mb-4">
                Standard Delivery - ${deliveryCharge}
              </button>

              {/* promo code */}
              <h3>Promo Code</h3>
              <p className="text-sm text-gray-500 mb-2">
                Enter your promo code if you have one
              </p>
              <div className="flex justify-between gap-2">
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  type="text"
                  placeholder="Enter your code"
                  className="py-2 px-4 rounded-sm border-2 w-full"
                />

                <button
                  onClick={() => {
                    setDiscount(0);
                    handleCheckPromoCode(promoCode);
                  }}
                  className="bg-green-600 text-white py-2 px-4 rounded-sm"
                >
                  Apply
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                Total discount : {discount ? discount : 0}%
              </p>
              <hr className="border-gray-300 my-4 " />
              <div className="flex-row ">
                <div className="flex justify-between ">
                  <h3 className="font-bold">TOTAL COST</h3>
                  <h3>$ {totalCost}</h3>
                </div>

                <button
                  onClick={() => {
                    if (cartItems?.length === 0 && customItem?.length === 0) {
                      toast.error("Please add items to the cart");
                      return;
                    }
                    useOrderStore.getState().setOrder(createOrder);
                    router.push("/checkout");
                  }}
                  className="mt-3 w-full bg-blue-600 text-xl border-2 text-white p-4 rounded-sm hover:cursor-pointer hover:bg-blue-500 hover:border-blue-500"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
