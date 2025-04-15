import { AppDataSource, initializeDataSource } from "@/db/config";
import { Promotion } from "@/db/models/Promotion";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const promoCode = searchParams.get("promoCode");
  const discount = searchParams.get("discount");
  const isActive = searchParams.get("isActive");

  try {
    await initializeDataSource();
    const promoRepo = AppDataSource.getRepository(Promotion);
    if (!promoCode) throw new ApiError(400, {}, "Please pass a Promo Code.");

    const newPromo = promoRepo.create({
      code: promoCode,
      discountPercentage: parseFloat(discount || "0"),
      isActive: isActive === "true",
    });

    const saved = await promoRepo.save(newPromo);
    return NextResponse.json(new ApiResponse(400, saved, "Promo Created"));
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error);
    } else {
      return NextResponse.json(
        new ApiError(400, error, "Something went Wrong"),
        { status: 400 }
      );
    }
  }
}
