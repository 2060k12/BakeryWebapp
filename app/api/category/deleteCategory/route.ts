import { AppDataSource, initializeDataSource } from "@/db/config";
import { Category } from "@/db/models/CategoryModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = Object.fromEntries(req.nextUrl.searchParams);

    if (!id)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        { id: "" },
        "id cannot be empty"
      );

    // initializing data source
    await initializeDataSource();

    const categoryRepository = AppDataSource.getRepository(Category);

    // search for the cake in the database
    const searched = await categoryRepository.findOne({ where: { id } });

    if (!searched)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Category not found");

    // delete the cake and check if it was successfully deleted
    const delCake = await categoryRepository.softRemove(searched);
    if (!delCake)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Unable to delete Cake");

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, {}, "Cake Removed ", true),
      { status: StatusCode.OK }
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
