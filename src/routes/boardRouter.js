import express from "express";
import routes from "../routes";
import { get30Board, getBoard, createBoard, deleteBoard, getComment, deleteComment} from "../controllers/boardController";

const boardRouter = express.Router();

//read 30 board
boardRouter.get("/", get30Board);

//read detail board
boardRouter.get(routes.boardDetail, getBoard);

//create board
boardRouter.post("/", createBoard);

//delete board
boardRouter.delete(routes.boardDetail, deleteBoard);


//read comment
boardRouter.get(routes.boardComment, getComment);

//create comment
//boardRouter.post(":boardId/create", createComment);

//delete comment
boardRouter.delete(routes.boardCommentDetail, deleteComment);

export default boardRouter;
