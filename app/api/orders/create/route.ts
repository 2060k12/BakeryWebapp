import { AppDataSource, initializeDataSource } from "@/db/config";
import { Customers } from "@/db/models/CustomerModel";
import { Item } from "@/db/models/ItemModel";
import { Orders, OrderStatus } from "@/db/models/OrderModel";
import { ProofOfPayment } from "@/db/models/ProofOfPayment";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";
import { In } from "typeorm";
interface createOrderPayload {
  appliedPromo: string;
  deliveryDate: Date;
  discount?: number;
  GrossPrice: number;
  proofScreenshot: string;
  customer: Customer;
  items: Items[];
}

interface Customer {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  addressDescription: string;
  identityProof: string;
}

interface Items {
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const orderPayload: createOrderPayload = await req.json();
    const items: Items[] = orderPayload.items;
    const customer: Customer = orderPayload.customer;

    await initializeDataSource();
    if (
      !customer.name ||
      !customer.address ||
      !customer.email ||
      !customer.identityProof ||
      !customer.phoneNumber ||
      !customer.addressDescription
    )
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {
          customer: {
            name: "",
            address: "",
            email: "",
            identityProof: "",
            phoneNumber: "",
            addressDescription: "",
          },
        },
        "Customer details not complete"
      );

    if (items.length <= 0)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "There should be at least one item on the cart."
      );

    if (!orderPayload.deliveryDate || !orderPayload.proofScreenshot)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Delivery date and Payment proof is mandiatory."
      );

    const itemRepo = AppDataSource.getRepository(Item);
    const itemIds = items.map((item) => item.id);

    const existingItems = await itemRepo.find({
      where: {
        id: In(itemIds),
      },
    });

    if (existingItems.length !== items.length) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "One or more items in the cart do not exist."
      );
    }

    // add customer details in database
    const customerRepo = AppDataSource.getRepository(Customers);
    const newCustomer = customerRepo.create({
      address: customer.address,
      addressDescription: customer.addressDescription,
      email: customer.email,
      identityProof: customer.identityProof,
      phoneNumber: customer.phoneNumber,
      name: customer.name,
    });

    const savedCustomer = await customerRepo.save(newCustomer);

    const proofRepo = AppDataSource.getRepository(ProofOfPayment);
    const proofOfPayment = proofRepo.create({
      proofScreenshot: orderPayload.proofScreenshot,
    });
    const savedProof = await proofRepo.save(proofOfPayment);

    // Store orders in database
    const orderRepo = AppDataSource.getRepository(Orders);
    const newOrder = orderRepo.create({
      appliedPromo: orderPayload.appliedPromo,
      deliveryDate: orderPayload.deliveryDate,
      GrossPrice: orderPayload.GrossPrice,
      proofOfPayment: savedProof,
      status: OrderStatus.PENDING,
      items: existingItems,
      discount: orderPayload.discount,
      customer: savedCustomer,
    });

    const savedOrder = await orderRepo.save(newOrder);
    if (!savedOrder)
      throw new ApiError(
        StatusCode.BAD_GATEWAY,
        {},
        "Something went wrong while saving "
      );

    return NextResponse.json(
      new ApiResponse(StatusCode.CREATED, savedOrder, "Order placed.")
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
