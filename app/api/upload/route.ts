import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface UploadRequestBody {
  fileName: string;
  fileType: string;
}

interface UploadResponse {
  uploadUrl: string;
}

const s3 = new S3Client({
  region: process.env.AWS_REGION_S3 || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  const { fileName, fileType }: UploadRequestBody = await req.json();

  if (!fileName || !fileType) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
    ACL: "public-read",
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  const response: UploadResponse = { uploadUrl };

  return NextResponse.json(response, { status: 200 });
}
