import { mysqlConn } from "../db";
const userQuery = require("../queries/userQuery");

// 회원정보 조회
export const readUserInfo = async (req, res) => {
	if (req.user == "undefined") {
		return res.status(422).send({ error: "must be sign in" });
	}
	try {
		const userId = req.user.userId;
		await mysqlConn(async (conn) => {
			const [data, schema] = await conn.query(userQuery.getUserInfo, [userId]);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

// 회원정보 수정
export const updateUserInfo = async (req, res) => {
    if (req.user == "undefined") {
		return res.status(422).send({ error: "must be sign in" });
	}
	try {
        const body = req.body;
		const userId = req.user.userId;
		await mysqlConn(async (conn) => {
			const [data] = await conn.query(userQuery.updateUserInfo, [
				body.nickname,
				body.password,
				body.phoneNumber,
				body.profileImage,
				userId,
			]);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

// 회원 탈퇴
export const withdrawal = async (req, res) => {
    if (req.user == "undefined") {
		return res.status(422).send({ error: "must be sign in" });
	}
	try {
        const userId = req.user.userId;
		await mysqlConn(async (conn) => {
			const [data] = await conn.query(userQuery.deleteUser, [userId]);
			return res.status(200).json(data);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};
