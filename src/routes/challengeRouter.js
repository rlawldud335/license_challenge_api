import express from "express";
import {
  getCategoryChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
  getOngoingChallenge,
  getEndedChallenge,
  searchChallenge,
  getAchievementRate,
  enterChallenge,
  updateChallenge,
  refundChallengeDeposit,
  refundChallengeBonus
} from "../controllers/challengeController";
import { usePoint,earnPoint } from "../controllers/pointController"
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

//챌린지 참가
challengeRouter.post("/enter", 
  usePoint,
  enterChallenge,
  earnPoint
);

//달성률 조회
challengeRouter.get("/achievementRate", getAchievementRate);


//챌린지 보증금 환급_출석
challengeRouter.post("/refund-deposit", 
  refundChallengeDeposit,
  earnPoint
);

//챌린지 보너스 환급_자격증합격시
// challengeRouter.post("/refund-bonus", 
//   refundChallengeBonus,
//   earnPoint
// );


//챌린지 상세조회
challengeRouter.get("/detail", getChallenge);

//챌린지 삭제
challengeRouter.delete("/", deleteChallenge);

//챌린지 수정
challengeRouter.put("/", 
  challengeImgUpload.fields([
    { name: "challengeTitleImage"},
    { name: "goodProofImage"},
    { name: "badProofImage"},
  ]),
updateChallenge);


export default challengeRouter;
