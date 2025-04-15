import { AppDataSource, initializeDataSource } from "@/db/config";
import { Orders, OrderStatus } from "@/db/models/OrderModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  try {
    await initializeDataSource();
    const orderRepo = AppDataSource.getRepository(Orders);

    let existingOrders;
    // searching
    if (status && Object.values(OrderStatus).includes(status as OrderStatus)) {
      const typedStatus = status as OrderStatus;
      existingOrders = await orderRepo.find({
        where: { status: typedStatus },
      });
    } else {
      existingOrders = await orderRepo.find();
    }

    if (!existingOrders)
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Order not found.");

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, { existingOrders }, "All Orders fetched")
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
