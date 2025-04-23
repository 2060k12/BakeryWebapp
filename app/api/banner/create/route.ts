import { AppDataSource, initializeDataSource } from "@/db/config";
import { Promotion } from "@/db/models/Promotion";
import { PromotionBanner } from "@/db/models/PromotionBannerMode";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const promoCode = searchParams.get("promoCode");

  try {
    await initializeDataSource();
    const promoRepo = AppDataSource.getRepository(Promotion);
    const promoBannerRepo = AppDataSource.getRepository(PromotionBanner);

    if (!promoCode) throw new ApiError(400, {}, "Please pass a Promo Code.");

    const searchedPromo = await promoRepo.findOne({
      where: { code: promoCode },
    });

    if (!searchedPromo) {
      throw new ApiError(400, {}, "Promo not found");
    }

    // Check for existing banner
    const existingBanner = await promoBannerRepo.findOne({
      where: {},
    });

    let savedBanner;

    if (existingBanner) {
      // Update the existing banner
      existingBanner.discount = searchedPromo.discountPercentage;
      existingBanner.promoCode = promoCode;
      savedBanner = await promoBannerRepo.save(existingBanner);
    } else {
      // Create a new banner
      const newBanner = promoBannerRepo.create({
        discount: searchedPromo.discountPercentage,
        promoCode: promoCode,
      });
      savedBanner = await promoBannerRepo.save(newBanner);
    }

    return NextResponse.json(
      new ApiResponse(200, savedBanner, "Promo Created/Updated")
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
