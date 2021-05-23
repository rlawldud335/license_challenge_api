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
const challengeImgUpload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      let dt = new Date().toISOString()
      if (req.files['challengeTitleImage']) { cb(null, `challenge/title/${req.body.challengeTitle+"_"+dt}`) }
      if (req.files['goodProofImage']) { cb(null, `challenge/goodProof/${req.body.challengeTitle+"_"+dt}`) }
      if (req.files['badProofImage']) { cb(null, `challenge/badProof/${req.body.challengeTitle+"_"+dt}`) }
    }
  }),
});

exports.challengeImgUpload = multer(challengeImgUpload);


const boardImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `board/image/${Date.now()}_${file.originalname}`);
    },
  }),
});
exports.boardImage = multer(boardImage);
