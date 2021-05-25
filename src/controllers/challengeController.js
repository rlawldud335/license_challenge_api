import { mysqlConn } from "../db";
import { usePoint } from "../controllers/pointController"
const challengeQuery = require("../queries/challengeQuery");

export const getAchievementRate = async (req, res) => {
  const userId = req.user.userId;
  let { challengeId } = req.params;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getAchievementRate;
      const [data] = await conn.query(query, [userId, challengeId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const searchChallenge = async (req, res) => {
  const {
    query: { keyword, pageNum, numOfRows }
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.searchChallenge + pageNum * numOfRows + "," + numOfRows;
      const [data] = await conn.query(query, [keyword, keyword]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getOngoingChallenge = async (req, res) => {
  const userId = req.user.userId;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getOngoingChallenge;
      const [data] = await conn.query(query, [userId, userId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getEndedChallenge = async (req, res) => {
  const userId = req.user.userId;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getEndedChallenge;
      const [data] = await conn.query(query, [userId, userId]);
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
      if (category == "전체보기") {
        const query =
          challengeQuery.getAllChallenge +
          pageNum * numOfRows +
          "," +
          numOfRows;
        const [data] = await conn.query(query);
        return res.status(200).json(data);
      } else if(category=="자격증"){
        const query = challengeQuery.getLicenseChallenges + pageNum * numOfRows + "," + numOfRows;
        const [data] = await conn.query(query,[category]);
        return res.status(200).json(data);
      } else {
        const query = challengeQuery.getOtherChallenges + pageNum * numOfRows + "," + numOfRows;
        const [data] = await conn.query(query,[category]);
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
      const [data] = await conn.query(challengeQuery.getOneChallenge, [
        challengeId,challengeId
      ]);
      return res.status(200).json(data[0]);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createChallenge = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.userId;
    const chgStartDt = new Date(body.chgStartDt);
    const chgEndDt = new Date(body.chgEndDt);
    const challengeTerm =
      Math.ceil(
        (chgEndDt.getTime() - chgStartDt.getTime()) / (1000 * 3600 * 24)
      ) * body.proofCountOneDay;

    const challengeTitleImage = req.files["challengeTitleImage"][0];
    const goodProofImage = req.files["goodProofImage"][0];
    const badProofImage = req.files["badProofImage"][0];
    console.log("s3 title이미지 경로 :", challengeTitleImage.location);
    console.log("s3 good이미지 경로 :", goodProofImage.location);
    console.log("s3 bad이미지 경로 :", badProofImage.location);

    if (body.licenseId == "undefined" || body.licenseId == "") {
      await mysqlConn(async (conn) => {
        const [data] = await conn.query(challengeQuery.createOtherChallenge, [
          body.challengeTitle,
          body.challengeCategory,
          userId,
          body.proofMethod,
          body.proofAvailableDay,
          body.proofCount,
          body.proofCountOneDay,
          chgStartDt,
          chgEndDt,
          challengeTerm,
          challengeTitleImage.location,
          body.challengeIntroduction,
          goodProofImage.location,
          badProofImage.location,
          body.deposit,
          body.limitPeople,
        ]);
        const [data2] = await conn.query(challengeQuery.enterChallenge_leader, [data.insertId,userId]);

        //return res.json(data[0]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "create other challenge",
        });
      });
    } else {
      await mysqlConn(async (conn) => {
        const [
          data
        ] = await conn.query(challengeQuery.createLicenseChallenge, [
          body.challengeTitle,
          body.challengeCategory,
          body.licenseId,
          userId,
          body.proofMethod,
          body.proofAvailableDay,
          body.proofCount,
          body.proofCountOneDay,
          chgStartDt,
          chgEndDt,
          challengeTerm,
          challengeTitleImage.location,
          body.challengeIntroduction,
          goodProofImage.location,
          badProofImage.location,
          body.deposit,
          body.limitPeople,
        ]);

        const [data2] = await conn.query(challengeQuery.enterChallenge_leader, [data.insertId, userId]);

        //return res.json(data[0]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "create license challenge",
        });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


export const updateChallenge = async (req, res) => {
  try {
    let { challengeId } = req.params;
    const body = req.body;

      await mysqlConn(async (conn) => {
        const [
          data
        ] = await conn.query(challengeQuery.updateChallenge, [
          body.challengeTitle,
          body.proofMethod,
          body.proofAvailableDay,
          body.proofCountOneDay,
          challengeTitleImage.location,
          body.challengeIntroduction,
          goodProofImage.location,
          badProofImage.location,
          body.limitPeople,
          challengeId
        ]);

        //return res.json(data[0]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "update challenge",
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
      const [data] = await conn.query(challengeQuery.deleteChallenge, [
        challengeId,
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: "delete challenge",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


export const enterChallenge = async (req, res) => {
  let { challengeId } = req.params;
  const userId = req.user.userId;

  try {
      await mysqlConn(async (conn) => {
        //보증금 결제하는 코드 추가해야함
        
        const [data] = await conn.query(challengeQuery.enterChallenge_follower, [challengeId, userId]);
        const [data2] = await conn.query(challengeQuery.plusJoinPeople, [challengeId]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "enter challenge",
          challengeId: challengeId,
          userId: userId
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};