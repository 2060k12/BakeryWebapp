import { AppDataSource, initializeDataSource } from "@/db/config";
import { VideoModel } from "@/db/models/VideoModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Video ID cannot be empty"
      );

    // initializing data source
    await initializeDataSource();

    // getting video repository
    const videoRepository = AppDataSource.getRepository(VideoModel);

    // check if video exists
    const video = await videoRepository.findOneBy({ id });

    if (!video) throw new ApiError(StatusCode.NOT_FOUND, {}, "Video not found");

    // delete the video
    await videoRepository.remove(video);

    return NextResponse.json(
      new ApiResponse(
        StatusCode.OK,
        { id },
        "Video deleted successfully",
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
