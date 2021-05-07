import express from "express";
import {
  getAllBoard,
  getBoard,
  createBoard,
  deleteBoard,
  createComment,
  deleteComment,
} from "../controllers/boardController";

const boardRouter = express.Router();

//readAll board
boardRouter.get("/all", getAllBoard);

//readDetail board
boardRouter.get("/read/:boardId", getBoard);

//create board
boardRouter.post("/create", createBoard);

//delete board
boardRouter.delete("/delete/:boardId", deleteBoard);

//create comment
boardRouter.post("/read/:boardId/create", createComment);

//delete comment
boardRouter.delete("/delete/:boardId/comment/:commentId", deleteComment);

export default boardRouter;
