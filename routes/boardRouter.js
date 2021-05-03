import express from "express";
const boardController = require("../controllers/boardController");

const boardRouter = express.Router();

//readAll board
boardRouter.get("/all", boardController.getAllBoard);

//readDetail board
boardRouter.get("/read/:boardId", boardController.getBoard);

//create board
boardRouter.post("/create", boardController.createBoard);

//delete board
boardRouter.delete("/delete/:boardId", boardController.deleteBoard);



//create comment
boardRouter.post("/read/:boardId/create", boardController.createComment);

//delete comment
boardRouter.delete("/delete/:boardId/comment/:commentId", boardController.deleteComment);

export default boardRouter;