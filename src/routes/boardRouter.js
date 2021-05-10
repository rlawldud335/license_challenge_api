import express from "express";
import routes from "../routes";
import { get30Board, getBoard, createBoard, deleteBoard } from "../controllers/boardController";

const boardRouter = express.Router();

//read 30 board
boardRouter.get("/", get30Board);

//read detail license
boardRouter.get(routes.boardDetail, getBoard);

//create board
boardRouter.post("/", createBoard);

//delete board
boardRouter.delete(routes.boardDetail, deleteBoard);

//create comment
//boardRouter.post(":boardId/create", createComment);

//delete comment
//boardRouter.delete("/delete/:boardId/comment/:commentId", deleteComment);

export default boardRouter;
