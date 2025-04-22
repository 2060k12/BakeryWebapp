import { AppDataSource, initializeDataSource } from "@/db/config";
import { VideoModel } from "@/db/models/VideoModel";
import { ApiError, ApiResponse, StatusCode } from "@/helpers/apiResponse";
import { NextRequest, NextResponse } from "next/server";

interface NewCakePayload {
  id: string;
  videoUrl: string;
}

export async function POST(req: NextRequest) {
  try {
    const { videoUrl }: NewCakePayload = await req.json();

    if (!videoUrl)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Video URL cannot be empty"
      );

    // initializing data source
    await initializeDataSource();

    // initializing category and videoRepository
    const videoRepository = AppDataSource.getRepository(VideoModel);

    const video = videoRepository.create({
      videoUrl,
    });

    const savedItem = await videoRepository.save(video);

    if (!savedItem)
      throw new ApiError(
        StatusCode.BAD_REQUEST,
        {},
        "Unable to save in database."
      );

    return NextResponse.json(
      new ApiResponse(
        StatusCode.CREATED,
        { savedItem },
        "New Item Added",
        true
      ),
      { status: StatusCode.CREATED }
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
