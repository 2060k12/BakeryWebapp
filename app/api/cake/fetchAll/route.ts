import { AppDataSource, initializeDataSource } from "@/db/config";
import { Cake } from "@/db/models/CakeModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextResponse } from "next/server";
import { IsNull } from "typeorm";

export async function DELETE() {
  try {
    // initializing data source
    await initializeDataSource();

    const cakeRepository = AppDataSource.getRepository(Cake);

    // search for the cake in the database
    const cakes = await cakeRepository.find({
      where: { deletedAt: IsNull() }, // Only fetch cakes that are not soft deleted
    });

    if (!cakes)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Cake not found");

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, { cakes }, "All Cakes Fetched ", true),
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
