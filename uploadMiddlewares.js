import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

//uploads
const multerProof = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge/proof",
  }),
});

export const uploadVideo = multerProof.single("proof");
