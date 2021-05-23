import express from "express";
import routes from "../routes";
import { boardImage } from "../uploadMiddlewares";
import { getCategoryBoard, getBoard, createBoard, deleteBoard, searchBoard, getBoardsOfWriter, getComment, createComment, deleteComment, updateComment} from "../controllers/boardController";

const boardRouter = express.Router();

//게시글 검색
boardRouter.get(routes.searchBoard, searchBoard);
//게시글 작성자의 글 목록 조회
boardRouter.get(routes.getBoardsOfWriter, getBoardsOfWriter);
//카테고리별 조회(=게시글 전체조회)
boardRouter.get("/", getCategoryBoard);
//게시글 상세조회
boardRouter.get(routes.boardDetail, getBoard);
//게시글 등록
boardRouter.post("/", boardImage.single('image'), createBoard);
//게시글 삭제
boardRouter.delete(routes.boardDetail, deleteBoard);


//댓글 조회
boardRouter.get(routes.boardComment, getComment);
//댓글 수정
boardRouter.post(routes.boardCommentDetail, updateComment);
//댓글 등록
boardRouter.post(routes.boardComment, createComment);
//댓글 삭제
boardRouter.delete(routes.boardCommentDetail, deleteComment);

export default boardRouter;
