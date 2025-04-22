import { AppDataSource, initializeDataSource } from "@/db/config";
import { Category } from "@/db/models/CategoryModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextResponse } from "next/server";
import { IsNull } from "typeorm";

export async function GET() {
  try {
    // initializing data source
    await initializeDataSource();

    const repository = AppDataSource.getRepository(Category);

    // search for the category in the database
    const searched = await repository.find({
      where: { deletedAt: IsNull() }, // Only fetch category that are not soft deleted
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
