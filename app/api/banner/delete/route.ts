import { AppDataSource, initializeDataSource } from "@/db/config";
import { PromotionBanner } from "@/db/models/PromotionBannerMode";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    await initializeDataSource();
    const promoBannerRepo = AppDataSource.getRepository(PromotionBanner);

    const searchedPromo = await promoBannerRepo.findOne({
      where: {},
    });

    if (!searchedPromo) {
      throw new ApiError(400, {}, "Promo not found");
    }

    await promoBannerRepo.delete(searchedPromo);

    return NextResponse.json(new ApiResponse(200, {}, "Promo Deleted"));
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
