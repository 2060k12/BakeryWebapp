import { AppDataSource, initializeDataSource } from "@/db/config";
import { BusinessDetail } from "@/db/models/BusinessModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

enum EditType {
  NAME = "name",
  ADDRESS = "address",
  PHONE = "phoneNumber",
  EMAIL = "email",
  DESCRIPTION = "description",
  IMAGE = "imageUrl",
  OPEANING = "openingTime",
  CLOSING = "closingTime",
  SOCIALMEDIALINKS = "socialMediaLinks",
  BRANCHNAME = "branchName",
  ISACTIVE = "isActive",
}

type UpdateDetailPayLoad = {
  editType: EditType;
  newData: string;
  //   socialMedia: JSON;
};

// This api updates the information abut the business
// If the quety is empty it gets the business id from the .env
// This approach is done to make this scalabe.
// If a new branch of the bakery is added, The only thing needed to get its details is its id.
export async function POST(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const id = params.id ?? process.env.BUSINESS_ID?.toString();
    let body: UpdateDetailPayLoad;

    try {
      body = await req.json();
    } catch (error) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {
          data: {
            editType: "",
            newData: "",
          },
          message: "These values needs to be filled",
          error,
        },
        "Invalid JSON format"
      );
    }

    if (!body.editType)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        { EditType },
        "Please Mention Edit Type"
      );
    if (!body.newData)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        { newData: "", socialMedia: {} },
        "Either newData or socialMedia needs to be passed"
      );
    // initialize db
    await initializeDataSource();

    const aboutRepository = AppDataSource.getRepository(BusinessDetail);
    // search for business in db if failed throw an error

    const seachedBusiness = await aboutRepository.findOne({ where: { id } });

    // if the searched business if empty throw an error
    if (!seachedBusiness)
      throw new ApiError(StatusCode.BAD_REQUEST, {}, "Business not found");

    // ❌ TODO :: Data needs to be checked before updating in the db

    switch (body.editType) {
      case EditType.ADDRESS:
        seachedBusiness.address = body.newData;
        break;

      case EditType.BRANCHNAME:
        seachedBusiness.branchName = body.newData;
        break;

      case EditType.CLOSING:
        seachedBusiness.closingTime = body.newData;
        break;
      case EditType.DESCRIPTION:
        seachedBusiness.description = body.newData;
        break;
      case EditType.EMAIL:
        seachedBusiness.email = body.newData;
        break;
      case EditType.IMAGE:
        seachedBusiness.imageUrl = body.newData;
        break;

      case EditType.NAME:
        seachedBusiness.name = body.newData;
        break;
      case EditType.OPEANING:
        seachedBusiness.openingTime = body.newData;
        break;
      case EditType.PHONE:
        seachedBusiness.phoneNumber = body.newData;
        break;
      //   case EditType.SOCIALMEDIALINKS:
      //     seachedBusiness.socialMediaLinks = socialMedia;
      //     break;
    }

    const savedBusiness = await aboutRepository.save(seachedBusiness);
    if (!savedBusiness)
      throw new ApiError(StatusCode.BAD_GATEWAY, {}, "Unable to save");

    // is everything went well this here, send a success response with Searched Business details
    return NextResponse.json(
      new ApiResponse(
        StatusCode.OK,
        { seachedBusiness },
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
