// import { AppDataSource, initializeDataSource } from "@/db/config";
// import { DietaryOption, Item } from "@/db/models/ItemModel";
// import { Orders } from "@/db/models/OrderModel";
// import { ProofOfPayment } from "@/db/models/ProofOfPayment";
// import { ApiError, StatusCode } from "@/helpers/apiResponse";
// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

// interface ItemPayload {
//   id?: string;
//   name: string;
//   description?: string;
//   message?: string;
//   dietaryOption: DietaryOption;
// }

// type OrderPayload = {
//   items: [ItemPayload];
//   appliedPromo: string;
//   deliveryDate: Date;
//   proofOfPayment: string;
//   deliveryAddress: string;
// };

// export async function POST(req: NextRequest) {
//   try {
//     let body: OrderPayload;

//     try {
//       body = await req.json();
//     } catch (error) {
//       throw new ApiError(
//         StatusCode.BAD_REQUEST,
//         {
//           data: {
//             cake: {
//               name: "",
//               description: "",
//               message: "",
//               dietaryOption: "",
//             },
//             appliedPromo: "",
//             deliveryDate: "",
//             proofOfPayment: " ",
//           },
//           message: "These values needs to be filled",
//           error,
//         },
//         "Invalid JSON format"
//       );
//     }
//     // initialize databsae and get repository
//     await initializeDataSource();
//     const newOrderRepository = AppDataSource.getRepository(Orders);
//     const proofOfPaymentRepository =
//       AppDataSource.getRepository(ProofOfPayment);

//     // creating an instance of Orders
//     const allItems: Item[] = [];
//     for (let item: Item of body.items) {
//       allItems.push({
//         avaivable: true,
//         name: item.name,
//         price: body.items,
//       });
//     }

//     const newOrder = newOrderRepository.create({
//       items: [
//         {
//           name: body.item.name,
//           description: body.cake.description,
//           message: body.cake.message,
//           dietaryOption: body.cake.dietaryOption,
//         },
//       ],
//       proofOfPayment: {
//         proofScreenshot: body.proofOfPayment,
//         // ID will be the same as the order
//         id: uuidv4(), // Manually set the ID (will be the same as the order's ID)
//       },
//       GrossPrice: body.grossPrice,
//       deliveryDate: body.deliveryDate,
//     });
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return NextResponse.json(error, { status: error.statusCode });
//     } else {
//       return NextResponse.json(
//         new ApiError(400, error, "Something went Wrong"),
//         { status: 400 }
//       );
//     }
//   }
// }
