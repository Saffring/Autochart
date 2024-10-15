import { S3Client } from "@aws-sdk/client-s3";
import { TranscribeClient } from "@aws-sdk/client-transcribe";

const region = process.env.NEXT_PUBLIC_AWS_REGION;
const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
};

export const s3Client = new S3Client({ region, credentials });
export const transcribeClient = new TranscribeClient({ region, credentials });
