"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useOrderStore } from "@/helpers/store";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

const Checkout = () => {
  const order = useOrderStore((state) => state.order);

  // Local state for customer info editing
  const [customer, setCustomer] = useState(
    order?.customer || {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      addressDescription: "",
      identityProof: "",
    }
  );

  const [imagePreviewScreenshot, setImagePreviewScreenshot] = useState<
    string | null
  >(null);
  const [file1, setFile1] = useState<File | null>(null);

  const [imagePreviewIdentityProof, setImagePreviewIdentityProof] = useState<
    string | null
  >(null);
  const [file2, setFile2] = useState<File | null>(null);

  // Handle drop for proof screenshot (Proof of Payment)
  const onDropScreenshot = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile1(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreviewScreenshot(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  // Handle drop for identity proof
  const onDropIdentityProof = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile2(file);
      const reader = new FileReader();
      reader.onload = () =>
        setImagePreviewIdentityProof(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getProofRootProps, getInputProps: getProofInputProps } =
    useDropzone({
      onDrop: onDropScreenshot,
      accept: "image/*",
    });

  const {
    getRootProps: getIdentityRootProps,
    getInputProps: getIdentityInputProps,
  } = useDropzone({
    onDrop: onDropIdentityProof,
    accept: "image/*",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    if (!order) {
      toast.error("No order data found.");
      return;
    }
    if (
      !customer.name ||
      !customer.email ||
      !customer.phoneNumber ||
      !customer.address ||
      !customer.addressDescription
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!file1) {
      toast.error("Upload a proof of payment image first");
      return;
    }

    if (!file2) {
      toast.error("Upload an identity proof image first");
      return;
    }
    try {
      //  Get signed URL for the image upload
      const uploadResponseProof = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file1?.name,
          fileType: file1?.type,
        }),
      });

      if (!uploadResponseProof.ok) {
        toast.error("Failed to get upload URL");
        return;
      }

      const { uploadUrlProof } = await uploadResponseProof.json();
      if (!uploadUrlProof) {
        toast.error("Failed to retrieve proof upload URL.");
        return;
      }
      // Upload the image to S3
      await fetch(uploadUrlProof, {
        method: "PUT",
        headers: {
          "Content-Type": file1?.type,
        },
        body: file1,
      });
      const uploadResponseIdentity = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file2?.name,
          fileType: file2?.type,
        }),
      });

      const { uploadUrlIdentity } = await uploadResponseIdentity.json();
      if (!uploadUrlIdentity) {
        toast.error("Failed to retrieve identity upload URL.");
        return;
      }

      if (!uploadResponseIdentity.ok) {
        toast.error("Failed to get upload URL");
        return;
      }

      await fetch(uploadUrlIdentity, {
        method: "PUT",
        headers: {
          "Content-Type": file2?.type,
        },
        body: file2,
      });

      // 3. Get the public image URL (remove query params from the signed URL)
      const uploadedImageUrlProof = uploadUrlProof.split("?")[0];
      const uploadedImageUrlIdentity = uploadUrlIdentity.split("?")[0];

      if (!uploadedImageUrlProof || !uploadedImageUrlIdentity) {
        toast.error("Image upload failed");
        return;
      }

      order.proofScreenshot = uploadedImageUrlProof;
      customer.identityProof = uploadedImageUrlIdentity;
      order.customer = customer;
      console.log("------------------------------------------------ ");
      console.log("Order data:", order);

      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong!");
    }
    // Here you would typically send the order to your backend
    toast.success("Order submitted successfully!");
  };

  if (!order) return <p className="text-center">No order data found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center py-4">Checkout</h1>
      <p className="text-center text-gray-600">
        Please review your order details and customer information.
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto py-8 px-4">
        {/* Order Summary */}
        <div className=" ">
          <div className="border-2 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <p>
              <strong>Order Name:</strong> {order.orderName}
            </p>
            <p>
              <strong>Delivery Date:</strong>{" "}
              {new Date(order.deliveryDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Gross Price:</strong> ${order.GrossPrice.toFixed(2)}
            </p>
            <p>
              <strong>Discount:</strong> {order.discount}%
            </p>
            <p>
              <strong>Promo Applied:</strong> {order.appliedPromo || "None"}
            </p>
          </div>

          {/* Editable Customer Information */}
          <div className="border-2 rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={customer.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Address</label>
                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium">Address Description</label>
                <textarea
                  name="addressDescription"
                  value={customer.addressDescription}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <button
                onClick={handleSubmitOrder}
                className="w-full bg-green-500 p-4 text-xl font-bold text-white rounded hover:bg-green-600"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Proof of Payment */}
          <div className="border-2 rounded-lg shadow p-6 mb-6 text-center">
            <h2 className="text-xl font-bold mb-2">Proof of Payment</h2>
            <div
              {...getProofRootProps()}
              className="border-dashed border-2 p-4 rounded cursor-pointer"
            >
              <input {...getProofInputProps()} />
              <p>Drag & drop an image here, or click to select a file</p>
            </div>
            {imagePreviewScreenshot ? (
              <Image
                src={imagePreviewScreenshot}
                alt="Proof of Payment"
                height={300}
                width={300}
                className="rounded mx-auto mt-2"
              />
            ) : (
              <p>No proof uploaded</p>
            )}
          </div>

          <div className="border-2 rounded-lg shadow p-6 mb-6 text-center">
            <label className="block font-medium">Identity Proof (Upload)</label>
            <div
              {...getIdentityRootProps()}
              className="border-dashed border-2 p-4 rounded cursor-pointer"
            >
              <input {...getIdentityInputProps()} />
              <p>Drag & drop an image here, or click to select a file</p>
            </div>
            {imagePreviewIdentityProof && (
              <Image
                src={imagePreviewIdentityProof}
                alt="Identity Proof"
                height={200}
                width={200}
                className="rounded mt-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
