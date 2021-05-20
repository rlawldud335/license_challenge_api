import { mysqlConn } from "../db";
const challengeQuery = require("../queries/challengeQuery");


export const getCategoryChallenge = async (req, res) => {
  try {
    const {
      query: { category, pageNum, numOfRows },
    } = req;

    await mysqlConn(async (conn) => {
      if(category=="전체보기"){
        const query = challengeQuery.getAllChallenge + pageNum * 30 + "," + numOfRows;
        const [data, schema] = await conn.query(query);
        return res.status(200).json(data);
      } else {
        const query = challengeQuery.getCategoryChallenge + pageNum * 30 + "," + numOfRows;
        const [data, schema] = await conn.query(query,[category]);
        return res.status(200).json(data);
      }
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
  const goodProofImage = req.files["goodProofImage"][0];
  const badProofImage = req.files["badProofImage"][0];
  console.log("s3 title이미지 경로 :", challengeTitleImage.location);
  console.log("s3 good이미지 경로 :", goodProofImage.location);
  console.log("s3 bad이미지 경로 :", badProofImage.location);
  try {
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.createChallenge, [
        body.challengeTitle,
        body.challengeCategory,
        body.licenseId,
        body.scheduleId,
        body.leaderId,
        body.proofMethod,
        body.proofAvailableDay,
        body.proofCount,
        body.proofCountOneDay,
        new Date(body.chgStartDt),
        new Date(body.chgEndDt),
        body.challengeTerm,
        challengeTitleImage.location,
        body.challengeIntroduction,
        goodProofImage.location,
        badProofImage.location,
        body.deposit,
        body.limitPeople,
        body.joinPeople,
      ]);
      //return res.json(data[0]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create challenge'
      });
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
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'delete challenge'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const enterChallenge = async (req, res) => {
  try {
    let { challengeId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.enterChallenge, [
        challengeId,
      ]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const paymentChallenge = async (req, res) => {
  const body = req.body;
  try {
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.paymentChallenge, [
        body.challengeId,
        body.userId,
        body.successCnt,
        body.failCnt,
        body.pass
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'payment point & enter challenge'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

