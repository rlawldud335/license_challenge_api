import express from "express";
import { postChallenge } from "../controllers/challengeController";

const challengeRouter = express.Router();

//challenge register
challengeRouter.post("/", postChallenge);

export default challengeRouter;