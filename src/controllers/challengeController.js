import { mysqlConn } from "../db";
import { usePoint } from "../controllers/pointController"
import { now } from "mongoose";
const challengeQuery = require("../queries/challengeQuery");

export const getAchievementRate = async (req, res) => {
  const userId = req.user.userId;
  let { challengeId } = req.params;
  // const {
  //   query: { challengeId }
  // } = req;

  console.log("여기")
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
      } else if (category == "자격증") {
        const query = challengeQuery.getLicenseChallenges + pageNum * numOfRows + "," + numOfRows;
        const [data] = await conn.query(query, [category]);
        return res.status(200).json(data);
      } else {
        const query = challengeQuery.getOtherChallenges + pageNum * numOfRows + "," + numOfRows;
        const [data] = await conn.query(query, [category]);
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
    // const {
    //   query: { challengeId }
    // } = req;
    let { challengeId } = req.params;
    await mysqlConn(async (conn) => {
      const [data] = await conn.query(challengeQuery.getOneChallenge, [
        challengeId, challengeId
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
    //let { challengeId } = req.params;
    const {
      query: { challengeId }
    } = req;
    const body = req.body;

    const challengeTitleImage = req.files["challengeTitleImage"][0];
    const goodProofImage = req.files["goodProofImage"][0];
    const badProofImage = req.files["badProofImage"][0];

    await mysqlConn(async (conn) => {
      const [
        data
      ] = await conn.query(challengeQuery.updateChallenge, [
        body.challengeTitle,
        body.proofMethod,
        body.proofAvailableDay,
        body.proofCount,
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
    // const {
    //   query: { challengeId }
    // } = req;
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


export const enterChallenge = async (req, res, next) => {
  //let { challengeId } = req.params;
  const challengeId = req.body.challengeId;
  const userId = req.user.userId;
  const deposit = req.body.deposit;

  try {
    await mysqlConn(async (conn) => {

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
    //실패시 보증금 환불
    req.body = {
      "point": deposit,
      "targetType": "챌린지 보증금 환불",
      "targetId": challengeId
    };
    next();
    //return res.status(500).json(err);
  }
};


export const refundChallengeDeposit = async (req, res, next) => {
  try {
    const challengeId = req.body.challengeId;
    const userId = req.user.userId;
    const deposit = req.body.deposit;

    await mysqlConn(async (conn) => {
      const [data] = await conn.query(challengeQuery.getChallengeEndDt, [challengeId]);
      const chgEndDt = new Date(data[0].chgEndDt);

      if (chgEndDt.getTime() > now().getTime()) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Challenge not yet complete",
          challengeId: challengeId,
          userId: userId
        });
      }

      const [check] = await conn.query(challengeQuery.checkDepositRefund, [userId, challengeId, userId, challengeId]);
      const pass = check[0].pass;
      const alreadyRefund = parseInt(check[0].refund_deposit);
      let refundRate = parseInt(check[0].refund_rate);

      if (refundRate == -1) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Is not your challenge",
          challengeId: challengeId,
          userId: userId
        });
      }
      else if (alreadyRefund) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "You have already received a refund",
          challengeId: challengeId,
          userId: userId
        });
      }
      else if (refundRate == 0) {
        await conn.query(challengeQuery.successDepositRefund, [challengeId, userId]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "The refund is 0",
          challengeId: challengeId,
          userId: userId,
          "Earn amount": 0
        });
      }
      else {
        refundRate = refundRate / 100;
      }

      //합격인증자는 전액환불
      if (pass == 1) {
        refundRate = 1;
      }
      const refundAmount = deposit * refundRate;

      //보증금 환급
      req.body = {
        "point": refundAmount,
        "targetType": "챌린지 보증금 환급",
        "targetId": challengeId
      };

      await conn.query(challengeQuery.successDepositRefund, [challengeId, userId]);
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};