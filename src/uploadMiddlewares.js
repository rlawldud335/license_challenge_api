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

const boardImgUpload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      let dt = new Date().toISOString();
      cb(null, `board/freeboard/image/${req.body.title+"_"+dt}`);
    },
  }),
});
exports.boardImgUpload = multer(boardImgUpload);

const boardFileUpload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      let dt = new Date().toISOString();
      if (req.files['image']) { cb(null, `board/saleboard/image/${req.body.title+"_"+dt}`) }
      if (req.files['previewFile']) { cb(null, `board/saleboard/previewFile/${req.body.title+"_"+dt}`) }
      if (req.files['allFile']) { cb(null, `board/saleboard/allFile/${req.body.title+"_"+dt}`) }
    },
  }),
});
exports.boardFileUpload = multer(boardFileUpload);

const proofPictureUpload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "licensechallenge",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      let dt = new Date().toISOString();
      cb(null, `challenge/proofPicture/${req.params.challengeId+"_"+req.user.userId+"_"+dt}`);
    },
  }),
});
exports.proofPictureUpload = multer(proofPictureUpload);