import { AppDataSource, initializeDataSource } from "@/db/config";
import { Cake } from "@/db/models/CakeModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = Object.fromEntries(req.nextUrl.searchParams);

    if (!id)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        { cakeId: "" },
        "CakeId cannot be empty"
      );

    // initializing data source
    await initializeDataSource();

    const cakeRepository = AppDataSource.getRepository(Cake);

    // search for the cake in the database
    const searchedCake = await cakeRepository.findOne({ where: { id } });
    console.log(searchedCake);
    if (!searchedCake)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Cake not found");

    // delete the cake and check if it was successfully deleted
    const delCake = await cakeRepository.softRemove(searchedCake);
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
