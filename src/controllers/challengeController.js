import { mysqlConn } from "../db";
const challengeQuery = require("../queries/challengeQuery");

export const getAllChallenge = async (req, res) => {
  try {
    const {
      query: { pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getAllChallenge + pageNum * 30 + "," + numOfRows;
      const [data, schema] = await conn.query(query);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getCategoryChallenge = async (req, res) => {
  try {
    const {
      query: { category, pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getCategoryChallenge + pageNum * 30 + "," + numOfRows;
      const [data, schema] = await conn.query(query);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


export const getChallenge = async (req, res) => {
  try {
    let { challengeId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.getChallenge, [
        challengeId,
      ]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createChallenge = async (req, res) => {
  const body = req.body;
  const challengeTitleImage = req.files["challengeTitleImage"][0];
  const gooProofImage = req.files["gooProofImage"][0];
  const badProofImage = req.files["badProofImage"][0];
  console.log("s3 title이미지 경로 :", challengeTitleImage.location);
  console.log("s3 good이미지 경로 :", gooProofImage.location);
  console.log("s3 bad이미지 경로 :", badProofImage.location);
  try {
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.createChallenge, [
        body.challengeId, // id도 자동생성이 좋앙
        body.challengeTitle,
        body.challengeCategory,
        body.scheduleId,
        body.leaderId,
        body.proofMethod,
        body.proofCount,
        body.proofCountOneDay,
        new Date(body.chgStartDt),
        new Date(body.chgEndDt),
        body.challengeTerm,
        challengeTitleImage.location,
        body.challengeInroduction,
        gooProofImage.location,
        badProofImage.location,
        new Date(body.challengeCreateDt), // db에서 timestamp로 찍는편이 좋음. 아니면 date.now? 아무튼 현재시간 자동~
        body.deposit,
        body.limitPeople,
        body.joinPeople,
      ]);
      //return res.json(data[0]);
      return res.send("create success!");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    let { challengeId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.deleteChallenge, [
        challengeId,
      ]);
      return res.send("delete success!");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.register = (req, res, next) => {
  const Img = req.file;
  console.log("s3 이미지 경로 :", Img.location);
};
