import express from "express";
import {
  getCategoryChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
  getOngoingChallenge,
  getEndedChallenge,
  searchChallenge,
  getAchievementRate
} from "../controllers/challengeController";
import { 
  challengeImgUpload
 } from "../uploadMiddlewares";

const challengeRouter = express.Router();

//진행중인 챌린지 조회
challengeRouter.get("/ongoingChallenge", getOngoingChallenge);

//종료챌린지 조회
challengeRouter.get("/endedChallenge", getEndedChallenge);

//카테고리별 조회
challengeRouter.get("/", getCategoryChallenge);

//챌린지 검색
challengeRouter.get("/search", searchChallenge);


//챌린지 생성
challengeRouter.post(
  "/",
  challengeImgUpload.fields([
    { name: "challengeTitleImage"},
    { name: "goodProofImage"},
    { name: "badProofImage"},
  ]),
  createChallenge
);

//챌린지 상세조회
challengeRouter.get("/:challengeId", getChallenge);

//달성률 조회
challengeRouter.get("/:challengeId/achievementRate", getAchievementRate);

//챌린지 삭제
challengeRouter.delete("/:challengeId", deleteChallenge);

//챌린지 참가
//challengeRouter.post("/:challengeId/enter", enterChallenge);
//challengeRouter.post("/payment", paymentChallenge);

export default challengeRouter;
