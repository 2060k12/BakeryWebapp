import { AppDataSource, initializeDataSource } from "@/db/config";
import { BusinessDetail } from "@/db/models/BusinessModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

// this api fetchs the information abut the business
// if the quety is empty it gets the vusiness id from the .env
// This approach is done to make this scalabe.
// if a new branch of the bakery is added, The only thing needed to get its details is its id.
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const id = params.id ?? process.env.BUSINESS_ID?.toString();

  try {
    // initialize db
    await initializeDataSource();

    const aboutRepository = AppDataSource.getRepository(BusinessDetail);
    // search for business in db if failed throw an error
    console.log(id);
    const seachdBusiness = await aboutRepository.findOne({ where: { id } });

    // if the searched business if empty throw an error
    if (!seachdBusiness)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Business not found");

    // is everything went well this here, send a success response with Searched Business details
    return NextResponse.json(
      new ApiResponse(
        StatusCode.OK,
        { seachdBusiness },
        "Business Found Successfully",
        true
      ),
      { status: StatusCode.OK }
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
