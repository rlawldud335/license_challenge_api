import express from "express";
import {
  getCategoryChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
} from "../controllers/challengeController";
import { upload } from "../uploadMiddlewares";

const challengeRouter = express.Router();

//challenge register
challengeRouter.get("/", getCategoryChallenge);
challengeRouter.get("/:challengeId", getChallenge);
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

export default challengeRouter;
