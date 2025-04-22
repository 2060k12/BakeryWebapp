import { AppDataSource, initializeDataSource } from "@/db/config";
import { Promotion } from "@/db/models/Promotion";
import { ApiError, ApiResponse } from "@/helpers/apiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await initializeDataSource();
    const promoRepo = AppDataSource.getRepository(Promotion);

    const searched = await promoRepo.find();

    return NextResponse.json(
      new ApiResponse(400, searched, "All promos fetched")
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
