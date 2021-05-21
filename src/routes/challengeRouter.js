import express from "express";
import {
  getCategoryChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
  getOngoingChallenge,
  getEndedChallenge,
  searchChallenge,
} from "../controllers/challengeController";
import { upload } from "../uploadMiddlewares";

const challengeRouter = express.Router();

//challenge register

//진행중인 챌린지 조회
challengeRouter.get("/ongoingChallenge", getOngoingChallenge);
//종료챌린지 조회
challengeRouter.get("/endedChallenge", getEndedChallenge);
//카테고리별 조회
challengeRouter.get("/", getCategoryChallenge);
//챌린지 상세조회
challengeRouter.get("/:challengeId", getChallenge);
//챌린지 검색
challengeRouter.get("/searchChallenge/:keyword", searchChallenge);
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
challengeRouter.delete("/:challengeId", deleteChallenge);
challengeRouter.get("/enter/:challengeId", enterChallenge);
challengeRouter.post("/payment", paymentChallenge);

//챌린지 참가

export default challengeRouter;
