"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontSize: "22px",
          padding: "12px",
        },
      }}
      position="bottom-right"
      reverseOrder={false}
    />
  );
};

export default ToasterProvider;
