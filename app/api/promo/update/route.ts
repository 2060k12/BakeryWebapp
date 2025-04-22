import { AppDataSource, initializeDataSource } from "@/db/config";
import { Promotion } from "@/db/models/Promotion";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const promoCode = searchParams.get("promoCode");
  const discount = searchParams.get("discount");

  try {
    await initializeDataSource();
    const promoRepo = AppDataSource.getRepository(Promotion);
    if (!promoCode) throw new ApiError(400, {}, "Please pass a Promo Code.");
    if (!discount) throw new ApiError(400, {}, "Please provide discount.");

    const existingPromo = await promoRepo.findOne({
      where: { code: promoCode },
    });
    if (!existingPromo) throw new ApiError(404, {}, "Promo Code not found.");

    existingPromo.discountPercentage = parseFloat(discount || "0");

    const updatedPromo = await promoRepo.save(existingPromo);
    return NextResponse.json(
      new ApiResponse(200, updatedPromo, "Promo Updated")
    );
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
