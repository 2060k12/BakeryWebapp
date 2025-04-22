import { AppDataSource, initializeDataSource } from "@/db/config";
import { Orders, OrderStatus } from "@/db/models/OrderModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await initializeDataSource();
  const orderRepo = AppDataSource.getRepository(Orders);
  try {
    if (!id)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "To cancel any order, You need an id."
      );

    const existingOrder = await orderRepo.findOne({ where: { id } });

    if (!existingOrder)
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Order not found.");

    existingOrder.status = OrderStatus.CANCELLED;
    existingOrder.deletedAt = new Date();
    const saved = await orderRepo.save(existingOrder);
    if (!saved)
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Unable to cancel order");

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, {}, "Order Cancelled")
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
