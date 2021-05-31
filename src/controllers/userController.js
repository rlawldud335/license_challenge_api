import { mysqlConn } from "../db";
const userQuery = require("../queries/userQuery");

// 회원정보 조회
export const readUserInfo = async (req, res) => {
	try {
		const userId = req.user.userId;
		await mysqlConn(async (conn) => {
			const [data] = await conn.query(userQuery.getUserInfo, [userId]);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

// 회원정보 수정
export const updateUserInfo = async (req, res) => {
	try {
		const body = req.body;
		const userId = req.user.userId;
		await mysqlConn(async (conn) => {
			await conn.query(userQuery.updateUserInfo, [
				body.nickname,
				body.password,
				body.phoneNumber,
				body.profileImage,
				userId,
			]);
			return res.status(200).json({
				code: 200,
				success: true,
				message: 'update userInfo',
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

// 회원 탈퇴
export const withdrawal = async (req, res) => {
	try {
		const userId = req.user.userId;
		await mysqlConn(async (conn) => {
			await conn.query(userQuery.deleteUser, [userId]);
			return res.status(200).json({
				code: 200,
				success: true,
				message: 'delete user',
			});
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};
