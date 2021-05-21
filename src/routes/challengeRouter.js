import express from "express";
import {
  getCategoryChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
  getOngoingChallenge,
} from "../controllers/challengeController";
import { upload } from "../uploadMiddlewares";

const challengeRouter = express.Router();

//challenge register
//카테고리별 조회
challengeRouter.get("/", getCategoryChallenge);
//개별조회
challengeRouter.get("/:challengeId", getChallenge);
//챌린지 생성
challengeRouter.post(
  "/",
  upload.fields([
    { name: "challengeTitleImage" },
    { name: "goodProofImage" },
    { name: "badProofImage" },
  ]),
  createChallenge
);
//챌린지 삭제
challengeRouter.delete("/:challengeId", deleteChallenge);

//챌린지 참가

//진행중인 챌린지 조회
challengeRouter.get("/ongoingChallenge", getOngoingChallenge);
//종료챌린지 조회

export default challengeRouter;
