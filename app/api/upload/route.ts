import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// upload image
export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    const result = await cloudinary.uploader.upload(image);
    console.log("Cloudinary upload result:", result);
    console.log("Cloudinary upload result:", result);
    console.log("Cloudinary upload result:", result);
    console.log("Cloudinary upload result:", result);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
