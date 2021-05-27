import { mysqlConn } from "../db";
import { refundDepositPoint } from "../controllers/pointController"
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

export const createChallenge = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.userId;
    if (req.user.point < body.deposit) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: 'Insufficient balance',
        userId: userId,
        balance: req.user.point,
        "Required Point": body.deposit - req.user.point
      });
    }

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
          body.deposit
        ]);
        //const [data2] = await conn.query(challengeQuery.enterChallenge_leader, [data.insertId, userId]);

        // return res.status(200).json({
        //   code: 200,
        //   success: true,
        //   message: "create other challenge",
        // });

        req.body = {
          create: true,
          challengeId: data.insertId,
          deposit: body.deposit
        }
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
          body.deposit
        ]);

        //const [data2] = await conn.query(challengeQuery.enterChallenge_leader, [data.insertId, userId]);

        // return res.status(200).json({
        //   code: 200,
        //   success: true,
        //   message: "create license challenge",
        // });

        req.body = {
          create: true,
          challengeId: data.insertId,
          deposit: body.deposit
        }
      });
    }


    next();

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

// 출석 보증금 수동 환급
// export const refundChallengeDeposit = async (req, res, next) => {
//   try {
//     const challengeId = req.body.challengeId;
//     const userId = req.user.userId;
//     const deposit = req.body.deposit;

//     await mysqlConn(async (conn) => {
//       const [data] = await conn.query(challengeQuery.getChallengeEndDt, [challengeId]);
//       const chgEndDt = new Date(data[0].chgEndDt);

//       if (chgEndDt.getTime() > now().getTime()) {
//         return res.status(200).json({
//           code: 200,
//           success: false,
//           message: "Challenge not yet complete",
//           challengeId: challengeId,
//           userId: userId
//         });
//       }

//       const [check] = await conn.query(challengeQuery.checkDepositRefund, [userId, challengeId, userId, challengeId]);
//       const pass = check[0].pass;
//       const alreadyRefund = parseInt(check[0].refund_deposit);
//       let refundRate = parseInt(check[0].refund_rate);

//       if (refundRate == -1) {
//         return res.status(200).json({
//           code: 200,
//           success: false,
//           message: "Is not your challenge",
//           challengeId: challengeId,
//           userId: userId
//         });
//       }
//       else if (alreadyRefund) {
//         return res.status(200).json({
//           code: 200,
//           success: false,
//           message: "You have already received a refund",
//           challengeId: challengeId,
//           userId: userId
//         });
//       }
//       else if (refundRate == 0) {
//         await conn.query(challengeQuery.successDepositRefund, [challengeId, userId]);
//         return res.status(200).json({
//           code: 200,
//           success: true,
//           message: "The refund is 0",
//           challengeId: challengeId,
//           userId: userId,
//           "Earn amount": 0
//         });
//       }
//       else {
//         refundRate = refundRate / 100;
//       }

//       //합격인증자는 전액환불
//       if (pass == 1) {
//         refundRate = 1;
//       }
//       const refundAmount = deposit * refundRate;

//       //보증금 환급
//       req.body = {
//         "point": refundAmount,
//         "targetType": "챌린지 보증금 환급",
//         "targetId": challengeId
//       };

//       await conn.query(challengeQuery.successDepositRefund, [challengeId, userId]);
//       next();
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

export const createProofPicture = async (req, res) => {
  try {
    let { challengeId } = req.params;
    const body = req.body;
    const proofImage = req.file;

    console.log("s3 proofImage 경로 :", proofImage.location);

    await mysqlConn(async (conn) => {
      //오늘 날짜
      var today = await conn.query(challengeQuery.getToday);
      //인증가능요일
      var proofAvailableDay = await conn.query(challengeQuery.getProofAvailableDay, [challengeId]);
      //하루 인증 횟수
      var proofCntOneDay = await conn.query(challengeQuery.getProofCntOneDay, [challengeId]);
      //일주일 인증 횟수
      var proofCnt = await conn.query(challengeQuery.getProofCnt, [challengeId]);
      //사용자 하루 인증 횟수
      var userDayCnt = await conn.query(challengeQuery.getUserDayCnt, [challengeId, req.user.userId]);
      //사용자 일주일 인증 횟수
      var userWeekCnt = await conn.query(challengeQuery.getUserWeekCnt, [challengeId, req.user.userId]);

      var today1 = today[0][0].dayofweek;
      var proofAvailableDay1 = proofAvailableDay[0][0].proofAvailableDay;
      var proofCntOneDay1 = proofCntOneDay[0][0].proofCountOneDay;
      var proofCnt1 = proofCnt[0][0].proofCount;
      var userDayCnt1 = userDayCnt[0][0].userDayCnt;
      var userWeekCnt1 = userWeekCnt[0][0].userWeekCnt;

      console.log(proofCntOneDay1, userDayCnt1, proofCntOneDay1, proofCnt1, userWeekCnt1);
      console.log(proofAvailableDay1, today1);

      //인증가능요일인지 확인
      var value = proofAvailableDay1.indexOf(today1);

      if (value != -1) {
        //인증횟수(하루, 일주일) 확인
        if ((proofCntOneDay1 > userDayCnt1) && (proofCntOneDay1 * proofCnt1 > userWeekCnt1)) {
          await conn.query(challengeQuery.createProofPicture, [
            challengeId,
            req.user.userId,
            proofImage.location,
            body.dailyReview
          ]);
          return res.status(200).json({
            code: 200,
            success: true,
            message: 'create proofPicture',
            proofImage: proofImage.location
          });
        } else {
          return res.status(401).json({
            code: 401,
            success: false,
            message: "You have already completed the number of authentications"
          });
        }
      } else {
        return res.status(401).json({
          code: 401,
          success: false,
          message: "It is not a certifiable day of the week"
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getProofPicture = async (req, res) => {
  try {
    let { challengeId } = req.params;
    const {
      query: { pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getProofPicture + pageNum * numOfRows + "," + numOfRows;
      const [data] = await conn.query(query, [challengeId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getProofPictureDetail = async (req, res) => {
  try {
    let { challengeId, pictureId } = req.params;
    await mysqlConn(async (conn) => {
      const [data] = await conn.query(challengeQuery.getProofPictureDetail, [challengeId, pictureId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};







//////////보너스 환급///////////////
export const refundChallengeBonus = async (req, res, next) => {
  try {
    let { challengeId } = req.params;
    const userId = req.user.userId;

    await mysqlConn(async (conn) => {
      const [data] = await conn.query(challengeQuery.getDepositBalance, [challengeId]);
      const balance = data[0].balance_deposit;

      if (!data[0].refund) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Challenge not yet complete",
          challengeId: challengeId,
          userId: userId
        });
      }
      if (balance == 0) {
        await conn.query(challengeQuery.successBonusRefund, [challengeId, userId]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "The refund is 0",
          challengeId: challengeId,
          userId: userId,
          "Earn amount": 0
        });
      }

      const [check] = await conn.query(challengeQuery.checkBonus, [userId, challengeId, userId, challengeId]);
      const [count] = await conn.query(challengeQuery.countBonusUsers, [challengeId]);
      let refundAmount = 0;
      const userCount = count[0].count;

      if (check[0].refund_bonus) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "You have already received a refund",
          challengeId: challengeId,
          userId: userId
        });
      }

      if (check[0].bonus_check) {
        refundAmount = Math.floor(balance / userCount);
        //보증금 환급
        req.body = {
          "point": refundAmount,
          "targetType": "챌린지 보너스 환급",
          "targetId": challengeId
        };

        await conn.query(challengeQuery.successBonusRefund, [challengeId, userId]);
        await conn.query(challengeQuery.successDepositRefund2, [refundAmount,challengeId]);
        next();
      }
      else {
        await conn.query(challengeQuery.successBonusRefund, [challengeId, userId]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: "The refund is 0",
          challengeId: challengeId,
          userId: userId,
          "Earn amount": 0
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};



////////////자동환급//////////////
export const refundDeposit_Auto = async function () {
  try {
    let allAmount = 0;
    await mysqlConn(async (conn) => {
      const [end] = await conn.query(challengeQuery.getEndedCLG);
      for (var i = 0; i < end.length; i++) {
        const challengeId = end[i].challengeId;
        const deposit = end[i].deposit;

        const [users] = await conn.query(challengeQuery.getEndedUsers, [challengeId]);
        for (var i = 0; i < users.length; i++) {
          const userId = users[i].userId;
          const achievement_rate = users[i].achievement_rate;
          let refundAmount = 0;

          if (80 <= achievement_rate) {
            refundAmount = deposit;
            allAmount += refundAmount;
          }
          else if (50 <= achievement_rate && achievement_rate < 80) {
            refundAmount = deposit * (achievement_rate / 100);
            allAmount += refundAmount;
          }
          else if(achievement_rate<50){
            refundAmount = 0;
          }

          
          refundDepositPoint(userId, refundAmount, challengeId);
          await conn.query(challengeQuery.successDepositRefund, [challengeId, userId]);
        }
        await conn.query(challengeQuery.successDepositRefund2, [allAmount, challengeId]);
        console.log("보증금 자동환급 성공! 챌린지ID:",challengeId, "환급총액:", allAmount);
      }
    });
    
  } catch (err) {
    console.log(err);
  }
};