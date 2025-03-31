import { AppDataSource, initializeDataSource } from "@/db/config";
import { Cake, DietaryOption } from "@/db/models/CakeModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

interface NewCakePayload {
  name: string;
  description?: string;
  message?: string;
  dietaryOption?: DietaryOption;
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, message, dietaryOption }: NewCakePayload =
      await req.json();
    if (!name)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Name cannot be empty");

    // initializing data source
    await initializeDataSource();

    const cakeRepository = AppDataSource.getRepository(Cake);

    // add diatery Option
    const newCake = cakeRepository.create({
      name,
      description,
      message,
      dietaryOption,
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
