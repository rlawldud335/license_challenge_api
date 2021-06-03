import express from "express";
import {
  getJoinPeopleList,
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
  refundChallengeBonus,
  createProofPicture,
  getProofPicture,
  getProofPictureDetail,
  refundDeposit_Auto,
  getAchievementRateInfo,
  proofCountAuto,
} from "../controllers/challengeController";
import { usePoint, earnPoint } from "../controllers/pointController"
import { challengeImgUpload, proofPictureUpload } from "../uploadMiddlewares";
const schedule = require('node-schedule');

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
    { name: "challengeTitleImage" },
    { name: "goodProofImage" },
    { name: "badProofImage" },
  ]),
  createChallenge,
  usePoint,
  enterChallenge,
  earnPoint
);

//챌린지 참가
challengeRouter.post("/enter",
  usePoint,
  enterChallenge,
  earnPoint
);

//챌린지 수정
challengeRouter.put("/",
  challengeImgUpload.fields([
    { name: "challengeTitleImage" },
    { name: "goodProofImage" },
    { name: "badProofImage" },
  ]),
  updateChallenge);


//달성률 조회
challengeRouter.get("/:challengeId/achievement-rate", getAchievementRate);

//챌린지 참여자 달성률 통계 조회
challengeRouter.get("/:challengeId/achievement-rate-info", getAchievementRateInfo);

// 참가자 리스트 조회
challengeRouter.get("/:challengeId/join-people", getJoinPeopleList);

//챌린지 상세조회
challengeRouter.get("/:challengeId", getChallenge);

//챌린지 삭제
challengeRouter.delete("/:challengeId", deleteChallenge);

//사진 인증
challengeRouter.post("/:challengeId/proof-picture", proofPictureUpload.single('proofImage'), createProofPicture);

//피드 조회
challengeRouter.get("/:challengeId/proof-picture", getProofPicture);

//피드 상세 조회
challengeRouter.get("/:challengeId/proof-picture/:pictureId", getProofPictureDetail);

//챌린지 보너스 환급
challengeRouter.post("/:challengeId/refund-bonus",
  refundChallengeBonus,
  earnPoint
);

//챌린지 보증금 자동환급_출석
schedule.scheduleJob('0 0 3 * * *', () => {
  refundDeposit_Auto()
});

//챌린지 보증금 자동환급_출석
schedule.scheduleJob('0 0 0 * * *', () => {
  proofCountAuto()
});

export default challengeRouter;