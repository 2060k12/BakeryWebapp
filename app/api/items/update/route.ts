import { AppDataSource, initializeDataSource } from "@/db/config";
import { Item, DietaryOption } from "@/db/models/ItemModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

interface ItemPayload {
  id: string;
  name: string;
  description?: string;
  message?: string;
  dietaryOption?: DietaryOption;
  price?: number;
}

export async function PUT(req: NextRequest) {
  try {
    const {
      name,
      description,
      message,
      dietaryOption,
      price,
      id,
    }: ItemPayload = await req.json();

    if (!id)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Id cannot be empty");

    if (
      dietaryOption &&
      !Object.values(DietaryOption).includes(dietaryOption)
    ) {
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Invalid dietary option");
    }

    // initializing data source
    await initializeDataSource();

    // initializing category and itemRepository
    const itemRepository = AppDataSource.getRepository(Item);

    const existingItem = await itemRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingItem) {
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Item not found");
    }

    // Update the existing item fields
    if (name !== undefined) existingItem.name = name;
    if (description !== undefined) existingItem.description = description;
    if (message !== undefined) existingItem.message = message;
    if (dietaryOption !== undefined) existingItem.dietaryOption = dietaryOption;
    if (price !== undefined) existingItem.price = price;

    const savedItem = await itemRepository.save(existingItem);

    if (!savedItem)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Unable to save in database."
      );

    return NextResponse.json(
      new ApiResponse(StatusCode.CREATED, { savedItem }, "Item saved", true),
      { status: StatusCode.CREATED }
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
