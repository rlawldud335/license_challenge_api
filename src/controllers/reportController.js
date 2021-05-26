import { mysqlConn } from "../db";
const reportQuery = require("../queries/reportQuery");

// 게시글 신고 (sale/free 둘다 포함)
export const reportBoard = async (req, res) => {
	try {
		let { boardId } = req.params;
		const body = req.body;
		await mysqlConn(async (conn) => {
			const [data] = await conn.query(reportQuery.reportBoard, [boardId]);
			await conn.query(reportQuery.intoReportLog, [
				body.suspecterId,
				req.user.userId,
				body.proofImageId,
				body.boardId,
				body.reportReason,
			]);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

// 부적절한 인증 신고
export const reportBadProof = async (req, res) => {
	try {
		let { proofImageId } = req.params;
		const body = req.body;
		await mysqlConn(async (conn) => {
			const [data] = await conn.query(reportQuery.reportBadProof, [proofImageId]);
			await conn.query(reportQuery.intoReportLog, [
				body.suspecterId,
				req.user.userId,
				body.proofImageId,
				body.boardId,
				body.reportReason,
			]);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

// 신고 내역 조회 - 관리자
export const getReportLog = async (req, res) => {
	try {
		const {
			query: { pageNum, numOfRows },
		} = req;
		await mysqlConn(async (conn) => {
			const query =
				reportQuery.getReportLog + pageNum * numOfRows + "," + numOfRows;
			const [data] = await conn.query(query);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};