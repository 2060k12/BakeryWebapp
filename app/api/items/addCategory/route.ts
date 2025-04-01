import { AppDataSource, initializeDataSource } from "@/db/config";
import { Category } from "@/db/models/CategoryModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

type CategoryPayload = {
  name: string;
  description?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { name, description }: CategoryPayload = await req.json();
    if (!name)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        { name: "" },
        "Name cannot be empty"
      );

    // initializing data source
    await initializeDataSource();

    const categoryRepository = AppDataSource.getRepository(Category);

    // add diatery Option
    const newCategory = categoryRepository.create({
      name,
      description,
    });

    const savedCategory = await categoryRepository.save(newCategory);
    if (!savedCategory)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Unable to save in database."
      );

    return NextResponse.json(
      new ApiResponse(
        StatusCode.CREATED,
        { savedCategory },
        "New Category Added",
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
