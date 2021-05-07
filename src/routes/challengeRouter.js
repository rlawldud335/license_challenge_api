import express from "express";
import {
  getAllChallenge,
  getChallenge,
  createChallenge,
  deleteChallenge,
} from "../controllers/challengeController";
import { upload } from "../uploadMiddlewares";

const challengeRouter = express.Router();

//challenge register
challengeRouter.get("/all", getAllChallenge);
challengeRouter.get("/read/:challengeId", getChallenge);
challengeRouter.post(
  "/create",
  upload.fields([
    { name: "challengeTitleImage" },
    { name: "gooProofImage" },
    { name: "badProofImage" },
  ]),
  createChallenge
);
challengeRouter.delete("/delete/:challengeId", deleteChallenge);
//challengeRouter.post('/upload', upload.single('testImg'), challengeController.register);

export default challengeRouter;
