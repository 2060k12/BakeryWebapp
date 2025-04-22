import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload an image
export const uploadResult = async (image: string) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      public_id: "items",
    });
    return result.secure_url; // returning the URL here
  } catch (error) {
    console.log(error);
    return null; // fallback in case of error
  }
};
