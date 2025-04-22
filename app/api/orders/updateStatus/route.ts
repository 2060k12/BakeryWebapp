import { AppDataSource, initializeDataSource } from "@/db/config";
import { Orders, OrderStatus } from "@/db/models/OrderModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const id = searchParams.get("id");

  try {
    await initializeDataSource();
    const orderRepo = AppDataSource.getRepository(Orders);

    if (!id) throw new ApiError(StatusCode.NOT_FOUND, {}, "Id not passed.");

    const existingOrder = await orderRepo.findOne({
      where: { id },
    });

    if (!existingOrder)
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Order not found");

    let typedStatus: OrderStatus;
    // searching
    if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
      typedStatus = status as OrderStatus;
      existingOrder.status = typedStatus;
      orderRepo.save(existingOrder);
    } else {
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Invalid Status");
    }

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, { existingOrder }, "Status changed")
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
