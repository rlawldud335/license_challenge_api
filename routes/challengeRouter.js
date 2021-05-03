import express from "express";

const challengeRouter = express.Router();
const challengeController = require('../controllers/challengeController')
const { upload } = require('../uploadMiddlewares');



//challenge register
challengeRouter.get("/all", challengeController.getAllChallenge);
challengeRouter.get("/read/:challengeId", challengeController.getChallenge);
challengeRouter.post("/create", upload.fields([{ name: 'challengeTitleImage' }, { name: 'gooProofImage' }, { name: 'badProofImage' }]), challengeController.createChallenge);
challengeRouter.delete("/delete/:challengeId", challengeController.deleteChallenge);
//challengeRouter.post('/upload', upload.single('testImg'), challengeController.register);


export default challengeRouter;
