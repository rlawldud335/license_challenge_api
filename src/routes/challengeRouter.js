import express from "express";
import {
  getCategoryChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
<<<<<<< Updated upstream
=======
  getOngoingChallenge,
  getEndedChallenge,
  searchChallenge,
>>>>>>> Stashed changes
} from "../controllers/challengeController";
import { upload } from "../uploadMiddlewares";

const challengeRouter = express.Router();

//challenge register
<<<<<<< Updated upstream
=======

//진행중인 챌린지 조회
challengeRouter.get("/ongoingChallenge", getOngoingChallenge);
//종료챌린지 조회
challengeRouter.get("/endedChallenge", getEndedChallenge);
//카테고리별 조회
>>>>>>> Stashed changes
challengeRouter.get("/", getCategoryChallenge);
challengeRouter.get("/:challengeId", getChallenge);
<<<<<<< Updated upstream
=======
//챌린지 검색
challengeRouter.get("/searchChallenge/:keyword", searchChallenge);
//챌린지 생성
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
//챌린지 참가



>>>>>>> Stashed changes
export default challengeRouter;
