import { createUploadRouteHandler, route } from "better-upload/server";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client();

export const { POST } = createUploadRouteHandler({
  client: s3,
  bucketName: "oficialia-documentos",
  routes: {
    demo: route({
      fileTypes: ["application/pdf"],
    }),
  },
});
