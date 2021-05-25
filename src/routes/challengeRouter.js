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
  createProofPicture,
  getProofPicture,
  getProofPictureDetail
} from "../controllers/challengeController";
import { usePoint,earnPoint } from "../controllers/pointController"
import { challengeImgUpload, proofPictureUpload } from "../uploadMiddlewares";

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

//챌린지 상세조회
challengeRouter.get("/:challengeId", getChallenge);

//달성률 조회
challengeRouter.get("/:challengeId/achievementRate", getAchievementRate);

//챌린지 삭제
challengeRouter.delete("/:challengeId", deleteChallenge);

//챌린지 수정
challengeRouter.put("/:challengeId", updateChallenge);

//사진 인증
challengeRouter.post("/:challengeId/proof-picture", proofPictureUpload.single('proofImage'), createProofPicture);

//피드 조회
challengeRouter.get("/:challengeId/proof-picture", getProofPicture);

//피드 상세 조회
challengeRouter.get("/:challengeId/proof-picture/:pictureId", getProofPictureDetail);

export default challengeRouter;
