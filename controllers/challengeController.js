import { mysqlconn, mgconn } from "../db";
const challengeQuery = require("../queries/challengeQuery");


export const getAllChallenge = async (req, res) => {
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(challengeQuery.getAllChallenge);
    return res.json(data[0]);
  } catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getChallenge = async (req, res) => {
  let { challengeId } = req.params;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(challengeQuery.getChallenge, [challengeId]);
    const rows = data[0]
    return res.json(rows[0]);
  } catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createChallenge = async (req, res) => {
  const body = req.body
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(challengeQuery.createChallenge,
      [
        body.challengeId,
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
        body.challengeTitleImage,
        body.challengeInroduction,
        body.gooProofImage,
        body.badProofImage,
        new Date(body.challengeCreateDt),
        body.deposit,
        body.limitPeople,
        body.joinPeople
      ]);
      
    //return res.json(data[0]);
    return res.send("create success!");

  } catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }

};

export const deleteChallenge = async (req, res) => {
  let { challengeId } = req.params;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const del = await conn.query(challengeQuery.deleteChallenge, [challengeId]);
    //return res.json(del[0]);
    return res.send("delete success!");
  } catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};