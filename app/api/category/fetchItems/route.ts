import { AppDataSource, initializeDataSource } from "@/db/config";
import { Category } from "@/db/models/CategoryModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { IsNull } from "typeorm";

export async function GET(req: NextRequest) {
  try {
    // initializing data source
    await initializeDataSource();
    const { id } = Object.fromEntries(req.nextUrl.searchParams);
    const repository = AppDataSource.getRepository(Category);

    if (!id) throw new ApiError(StatusCode.BAD_REQUEST, {}, "Id is required.");
    // search for the category in the database
    const searched = await repository.findOne({
      where: { deletedAt: IsNull(), id },
      relations: ["items"],
    });

    if (!searched)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Category not found");

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, searched, "All Cakes Fetched ", true)
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error, { status: error.statusCode });
    } else {
      return NextResponse.json(
        new ApiError(400, error, "Something went Wrong"),
        { status: 400 }
      );
    }
  }
}
