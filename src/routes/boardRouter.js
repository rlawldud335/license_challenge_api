import express from "express";
import routes from "../routes";
import { boardImgUpload, boardFileUpload } from "../uploadMiddlewares";
import {
    searchBoard,
    getBoardsOfWriter,
    getFreeBoard, getSaleBoard,
    createFreeBoard, createSaleBoard,
    getFreeBoardDetail, getSaleBoardDetail,
    updateFreeBoard, updateSaleBoard,
    deleteBoard,
    purchaseFile,
    getComment,
    updateComment,
    createComment,
    deleteComment
} from "../controllers/boardController";
import { usePoint } from "../controllers/pointController"

const boardRouter = express.Router();

//게시글 검색
boardRouter.get(routes.searchBoard, searchBoard);
//게시글 작성자의 글 목록 조회
boardRouter.get(routes.getBoardsOfWriter, getBoardsOfWriter);

//자유게시판 조회
boardRouter.get(routes.freeBoard, getFreeBoard);
//판매게시판 조회
boardRouter.get(routes.saleBoard, getSaleBoard);

//자유_게시글 등록
boardRouter.post(routes.freeBoard, boardImgUpload.array('image', 5), createFreeBoard);
//판매_게시글 등록
boardRouter.post(routes.saleBoard,
    boardFileUpload.fields([
        { name: "image" },
        { name: "previewFile" },
        { name: "allFile" },
    ]),
    createSaleBoard
);

//자유_게시글 상세조회
boardRouter.get(routes.freeBoardDetail, getFreeBoardDetail);
//판매_게시글 상세조회
boardRouter.get(routes.saleBoardDetail, getSaleBoardDetail);

//자유_게시글 수정
boardRouter.put(routes.freeBoardDetail, boardImgUpload.array('image', 5), updateFreeBoard);
//판매_게시글 수정
boardRouter.put(routes.saleBoardDetail,
    boardFileUpload.fields([
        { name: "image" },
        { name: "previewFile" },
        { name: "allFile" },
    ]),
    updateSaleBoard
);

//게시글 삭제
boardRouter.delete(routes.boardDetail, deleteBoard);

//첨부파일 포인트 결제
boardRouter.post(routes.saleBoardDetail, 
    usePoint,
    purchaseFile
);

//댓글 조회
boardRouter.get(routes.boardComment, getComment);
//댓글 수정
boardRouter.put(routes.boardCommentDetail, updateComment);
//댓글 등록
boardRouter.post(routes.boardComment, createComment);
//댓글 삭제
boardRouter.delete(routes.boardCommentDetail, deleteComment);

export default boardRouter;