// import multer from "multer";
// import multerS3 from "multer-s3";
// import aws from "aws-sdk";

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

//uploads
const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `challenge/title/${Date.now()}`);
    },
  }),
});
exports.upload = multer(upload);


const boardImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `board/${Date.now()}_${file.originalname}`);
    },
  }),
});
exports.boardImage = multer(boardImage);
