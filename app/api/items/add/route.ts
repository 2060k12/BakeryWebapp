import { AppDataSource, initializeDataSource } from "@/db/config";
import { Category } from "@/db/models/CategoryModel";
import { Item, DietaryOption } from "@/db/models/ItemModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

interface NewCakePayload {
  name: string;
  description?: string;
  message?: string;
  dietaryOption?: DietaryOption;
  price?: number;
  categoryId: string;
  itemImage: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      message,
      dietaryOption,
      price,
      categoryId,
      itemImage,
    }: NewCakePayload = await req.json();

    if (!name || !categoryId)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Name or Category id cannot be empty"
      );
    if (
      dietaryOption &&
      !Object.values(DietaryOption).includes(dietaryOption)
    ) {
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Invalid dietary option");
    }

    // initializing data source
    await initializeDataSource();

    // initilizing categry and itemRepository
    const itemRepository = AppDataSource.getRepository(Item);
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Categiry not found");

    const newItem = itemRepository.create({
      category,
      name,
      description,
      message,
      dietaryOption,
      price,
      itemImage,
    });

    const savedItem = await itemRepository.save(newItem);
    if (!savedItem)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Unable to save in database."
      );

    return NextResponse.json(
      new ApiResponse(
        StatusCode.CREATED,
        { savedItem },
        "New Item Added",
        true
      ),
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
