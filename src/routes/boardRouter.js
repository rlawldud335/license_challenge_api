import express from "express";
import routes from "../routes";
import { boardImage } from "../uploadMiddlewares";
import { get30Board, getBoard, createBoard, deleteBoard, getComment, deleteComment} from "../controllers/boardController";

const boardRouter = express.Router();

//read 30 board
boardRouter.get("/", get30Board);


//read detail board
boardRouter.get(routes.boardDetail, getBoard);

//create board
boardRouter.post("/", boardImage.single('image'), createBoard);

//delete board
boardRouter.delete("/:boardId", deleteBoard);


//read comment
boardRouter.get(routes.boardComment, getComment);

//create comment
//boardRouter.post(":boardId/create", createComment);

//delete comment
boardRouter.delete(routes.boardCommentDetail, deleteComment);

export default boardRouter;
