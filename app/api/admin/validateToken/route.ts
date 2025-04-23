import { NextRequest, NextResponse } from "next/server";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

export async function GET(req: NextRequest) {
  try {
    // Extract Bearer token from Authorization header
    const token = extractAccessToke(req);

    // Verify the token
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      jwt.verify(token, process.env.ACCESSTOKEN || "", (err, decoded) => {
        if (err) {
          throw new ApiError(
            StatusCode.BAD_REQUEST,
            {},
            "Invalid or expired token"
          );
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Invalid or expired token"
      );
    }

    return NextResponse.json(
      new ApiResponse(StatusCode.OK, {}, "Logged In Successfully")
    );
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
      return NextResponse.json(error, { status: error.statusCode });
    } else {
      toast.error("Something went wrong");
      return NextResponse.json(
        new ApiError(500, error, "Something went Wrong"),
        { status: 500 }
      );
    }
  }
}

const extractAccessToke = (req: NextRequest): string => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    throw new ApiError(StatusCode.BAD_REQUEST, {}, "No token provided");
  }

  const token = authHeader.split(" ")[1]; // Get the token part after "Bearer"
  if (!token) {
    throw new ApiError(StatusCode.BAD_REQUEST, {}, "Invalid token format");
  }

  return token;
};
