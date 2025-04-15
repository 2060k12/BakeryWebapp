import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { AppDataSource, initializeDataSource } from "@/db/config";
import { Admin } from "@/db/models/AdminModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";

export async function POST(req: NextRequest) {
  try {
    await initializeDataSource();
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "PLease enter both email and password first"
      );
    }

    const adminRepo = AppDataSource.getRepository(Admin);
    const existing = await adminRepo.findOneBy({ email });

    if (existing) {
      throw new ApiError(StatusCode.CONFLICT, {}, "Admin already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = adminRepo.create({
      email,
      password: hashedPassword,
    });

    await adminRepo.save(newAdmin);
    return NextResponse.json(
      new ApiResponse(StatusCode.CREATED, {}, "Admin created successfully.")
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
