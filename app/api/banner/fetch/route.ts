import { AppDataSource, initializeDataSource } from "@/db/config";
import { Promotion } from "@/db/models/Promotion";
import { PromotionBanner } from "@/db/models/PromotionBannerMode";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const promoCode = searchParams.get("promoCode");

  try {
    await initializeDataSource();
    const promoBannerRepo = AppDataSource.getRepository(PromotionBanner);

    const searchedPromo = await promoBannerRepo.findOne({
      where: {},
    });

    if (!searchedPromo) {
      throw new ApiError(404, {}, "Promo not found");
    }

    return NextResponse.json(
      new ApiResponse(200, searchedPromo, "Promo Fetched")
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error, { status: error.statusCode });
    } else {
      return NextResponse.json(
        new ApiError(500, error, "Something went Wrong"),
        { status: 500 }
      );
    }
  }
}
