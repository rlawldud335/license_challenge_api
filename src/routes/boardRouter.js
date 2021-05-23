import express from "express";
import routes from "../routes";
import { boardImage } from "../uploadMiddlewares";
import { getFreeBoard, getSaleBoard, getFreeBoardDetail, getSaleBoardDetail, createFreeBoard, createSaleBoard, deleteFreeBoard, deleteSaleBoard, searchBoard, getComment, deleteComment} from "../controllers/boardController";

const boardRouter = express.Router();

//자유게시판 조회
boardRouter.get(routes.freeBoard, getFreeBoard);
//판매게시판 조회
boardRouter.get(routes.saleBoard, getSaleBoard);

//자유_게시글 상세조회
boardRouter.get(routes.freeBoardDetail, getFreeBoardDetail);
//판매_게시글 상세조회
boardRouter.get(routes.saleBoardDetail, getSaleBoardDetail);

//자유_게시글 등록
boardRouter.post(routes.freeBoard, boardImage.single('image'), createFreeBoard);
// //판매_게시글 등록
// boardRouter.post(routes.saleBoard, boardImage.single('image'), createSaleBoard);

//자유_게시글 삭제
boardRouter.delete(routes.freeBoardDetail, deleteFreeBoard);
//판매_게시글 삭제
boardRouter.delete(routes.saleBoardDetail, deleteSaleBoard);

//게시글 검색
boardRouter.get(routes.searchBoard, searchBoard);

//댓글 조회
boardRouter.get(routes.boardComment, getComment);
//댓글 등록
//boardRouter.post(":boardId/create", createComment);
//댓글 삭제
boardRouter.delete(routes.boardCommentDetail, deleteComment);

export default boardRouter;
