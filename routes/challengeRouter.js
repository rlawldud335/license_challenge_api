import express from "express";

const challengeRouter = express.Router();
const challengeController = require('../controllers/challengeController')



//challenge register
challengeRouter.get("/all", challengeController.getAllChallenge);
challengeRouter.get("/read/:challengeId", challengeController.getChallenge);
challengeRouter.post("/create", challengeController.createChallenge);
challengeRouter.delete("/delete/:challengeId", challengeController.deleteChallenge);

export default challengeRouter;
