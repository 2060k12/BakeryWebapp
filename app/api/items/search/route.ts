import { AppDataSource, initializeDataSource } from "@/db/config";
import { Item } from "@/db/models/ItemModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { ILike } from "typeorm";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const name = params.name; // 🔥 FIXED this line

    // initializing data source
    await initializeDataSource();

    const itemRepository = AppDataSource.getRepository(Item);

    const existingItems = await itemRepository.find({
      where: name
        ? {
            name: ILike(`%${name}%`), // case-insensitive partial match
          }
        : {},
    });

    // changed logic to check if array is empty
    if (!existingItems.length) {
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Item not found");
    }

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, { existingItems }, "Items fetched", true),
      { status: StatusCode.OK }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error, { status: error.statusCode });
    } else {
      return NextResponse.json(
        new ApiError(400, error, "Something went wrong"),
        { status: 400 }
      );
    }
  }
}
