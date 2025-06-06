import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AppDataSource, initializeDataSource } from "@/db/config";
import { Admin } from "@/db/models/AdminModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

export async function POST(req: NextRequest) {
  try {
    await initializeDataSource();
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Please enter both email and password first"
      );
    }

    const adminRepo = AppDataSource.getRepository(Admin);
    const existing = await adminRepo.findOneBy({ email });

    if (!existing) {
      throw new ApiError(StatusCode.CONFLICT, {}, "Admin not found");
    }

    const checkPassword = await bcrypt.compare(password, existing.password);

    if (!checkPassword)
      throw new ApiError(StatusCode.CONFLICT, {}, "Invalid Credencials");

    let token;
    try {
      token = jwt.sign({ id: existing.id }, process.env.ACCESSTOKEN || "", {
        expiresIn: "1h",
      });
    } catch (error) {
      throw new ApiError(
        StatusCode.CONFLICT,
        {},
        `Unable to generate token ${error}`
      );
    }

    return NextResponse.json(
      new ApiResponse(StatusCode.CREATED, { token }, "Logged In Successfully")
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
