import { AppDataSource, initializeDataSource } from "@/db/config";
import { Item, DietaryOption } from "@/db/models/ItemModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

interface NewCakePayload {
  name: string;
  description?: string;
  message?: string;
  dietaryOption?: DietaryOption;
  price?: number;
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, message, dietaryOption, price }: NewCakePayload =
      await req.json();
    if (!name)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Name cannot be empty");

    // initializing data source
    await initializeDataSource();

    const cakeRepository = AppDataSource.getRepository(Item);

    // add diatery Option
    const newCake = cakeRepository.create({
      name,
      description,
      message,
      dietaryOption,
      price,
    });

    const savedCake = await cakeRepository.save(newCake);
    if (!savedCake)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Unable to save in database."
      );

    return NextResponse.json(
      new ApiResponse(
        StatusCode.CREATED,
        { savedCake },
        "New Cake Added",
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
