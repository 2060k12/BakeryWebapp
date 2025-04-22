import { AppDataSource, initializeDataSource } from "@/db/config";
import { VideoModel } from "@/db/models/VideoModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // initializing data source
    await initializeDataSource();

    // getting video repository
    const videoRepository = AppDataSource.getRepository(VideoModel);

    // check if video exists
    const videos = await videoRepository.find();

    if (!videos)
      throw new ApiError(StatusCode.NOT_FOUND, {}, "Video not found");

    return NextResponse.json(
      new ApiResponse(
        StatusCode.OK,
        videos,
        "Videos fetched successfully",
        true
      ),
      { status: StatusCode.OK }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(error, { status: error.statusCode });
    } else {
      return NextResponse.json(
        new ApiError(400, error, "Something went wrong"),
        { status: 400 }
      );
    }
  }
}
