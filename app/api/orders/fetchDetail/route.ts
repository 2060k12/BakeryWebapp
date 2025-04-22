import { AppDataSource, initializeDataSource } from "@/db/config";
import { Orders } from "@/db/models/OrderModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id) throw new ApiError(StatusCode.NOT_FOUND, {}, "Id is required.");

    await initializeDataSource();
    const orderRepo = AppDataSource.getRepository(Orders);

    // search
    const existingOrder = await orderRepo.findOne({
      where: { id },
      relations: ["customer", "proofOfPayment", "items"],
    });

    if (!existingOrder)
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Order not found.");

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, existingOrder, "Order details fetched.")
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error);
    } else {
      return NextResponse.json(
        new ApiError(400, error, "Something went Wrong"),
        { status: 400 }
      );
    }
  }
}
