import express from "express";
import routes from "../routes";
import { reportBoard, reportBadProof, getReportLog } from "../controllers/reportController";

const reportRouter = express.Router();

// 게시글 신고
reportRouter.post(routes.reportBoard, reportBoard);

// 부적절한 인증 신고
reportRouter.post(routes.reportProof, reportBadProof);

// 신고 내역 조회
reportRouter.get("/", getReportLog);

export default reportRouter;