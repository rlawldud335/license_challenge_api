import { mysqlConn } from "../db";
import { refundDepositPoint } from "../controllers/pointController"
import { now } from "mongoose";
const challengeQuery = require("../queries/challengeQuery");

export const getJoinPeopleList = async (req, res) => {
  let { challengeId } = req.params;
  
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getJoinPeopleList;
      const [data] = await conn.query(query, [challengeId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAchievementRate = async (req, res) => {
  const userId = req.user.userId;
  let { challengeId } = req.params;

  try {
    await mysqlConn(async (conn) => {
      const [data] = await conn.query(challengeQuery.getAchievementRate, [userId, challengeId]);
      const [proof] = await conn.query(challengeQuery.getUserDayCnt, [challengeId, userId]);
      const [proof2] = await conn.query(challengeQuery.getUserWeekCnt, [challengeId, userId]);
      if (data[0].pass) {
        data[0].pass = "인증완료"
      } else if (!data[0].pass) {
        data[0].pass = "인증미완료"
      }

      const [countAllchallengers] = await conn.query(challengeQuery.countAllchallengers, [challengeId]);
      const [countPasschallengers] = await conn.query(challengeQuery.countPasschallengers, [challengeId]);
      const [proofCntOneDay] = await conn.query(challengeQuery.getProofCntOneDay, [challengeId]);
      const [countDailyProofSuccess] = await conn.query(challengeQuery.getDailyProofSuccess, [challengeId, proofCntOneDay[0].proofCountOneDay]);
      const [achievementStatistics] = await conn.query(challengeQuery.getAchievementStatistics, [challengeId]);


      return res.status(200).json({
        challengeId: data[0].challengeId,
        challengeTitle: data[0].challengeTitle,
        successCnt: data[0].successCnt,
        failCnt: data[0].failCnt,
        achievement_rate: data[0].achievement_rate,
        pass: data[0].pass,
        passImage: data[0].passImage,
        refund_deposit: data[0].refund_deposit,
        refund_bonus: data[0].refund_bonus,
        userDayCnt: proof[0].userDayCnt,
        userWeekCnt: proof2[0].userWeekCnt,
        countAllchallengers: countAllchallengers[0].all_challengers,
        countPasschallengers: countPasschallengers[0].pass_challengers,
        countDailyProofSuccess: countDailyProofSuccess.length,
        achievementStatistics: achievementStatistics[0]
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAchievementRateInfo = async (req, res) => {
  const userId = req.user.userId;
  let { challengeId } = req.params;

  try {
    await mysqlConn(async (conn) => {
      const [countAllchallengers] = await conn.query(challengeQuery.countAllchallengers, [challengeId]);
      const [countPasschallengers] = await conn.query(challengeQuery.countPasschallengers, [challengeId]);
      const [proofCntOneDay] = await conn.query(challengeQuery.getProofCntOneDay, [challengeId]);
      const [countDailyProofSuccess] = await conn.query(challengeQuery.getDailyProofSuccess, [challengeId, proofCntOneDay[0].proofCountOneDay]);
      const [achievementStatistics] = await conn.query(challengeQuery.getAchievementStatistics, [challengeId]);


      return res.status(200).json({
        countAllchallengers: countAllchallengers[0].all_challengers,
        countPasschallengers: countPasschallengers[0].pass_challengers,
        countDailyProofSuccess: countDailyProofSuccess.length,
        achievementStatistics: achievementStatistics[0]
      });
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
      const [data] = await conn.query(query, [userId]);
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
      const [data] = await conn.query(query, [userId]);
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

      } else {
        const query = challengeQuery.getCategoryChallenges + pageNum * numOfRows + "," + numOfRows;
        const [data] = await conn.query(query, ["%"+category+"%"]);
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
      const [data] = await conn.query(challengeQuery.getOneChallenge, [challengeId]);
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

      const [data] = await conn.query(challengeQuery.enterChallenge_challenger, [challengeId, userId]);
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
    //const [data2] = await conn.query(challengeQuery.minusJoinPeople, [challengeId]);
    req.body = {
      point: deposit,
      targetType: "챌린지 보증금 환불",
      targetId: challengeId,
      success: false,
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
      const [today] = await conn.query(challengeQuery.getToday);
      //인증가능요일
      const [proofAvailableDay] = await conn.query(challengeQuery.getProofAvailableDay, [challengeId]);
      //하루 인증 횟수
      const [proofCntOneDay] = await conn.query(challengeQuery.getProofCntOneDay, [challengeId]);
      //일주일 인증 횟수
      const [proofCnt] = await conn.query(challengeQuery.getProofCnt, [challengeId]);
      //사용자 하루 인증 횟수
      const [userDayCnt] = await conn.query(challengeQuery.getUserDayCnt, [challengeId, req.user.userId]);
      //사용자 일주일 인증 횟수
      const [userWeekCnt] = await conn.query(challengeQuery.getUserWeekCnt, [challengeId, req.user.userId]);

      var today1 = today[0]["dayofweek"];
      var proofAvailableDay1 = proofAvailableDay[0]["proofAvailableDay"];
      var proofCntOneDay1 = proofCntOneDay[0]["proofCountOneDay"];
      var proofCnt1 = proofCnt[0]["proofCount"];
      var userDayCnt1 = userDayCnt[0]["userDayCnt"];
      var userWeekCnt1 = userWeekCnt[0]["userWeekCnt"];

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

          const [userDayCnt2] = await conn.query(challengeQuery.getUserDayCnt, [challengeId, req.user.userId]);
          if (userDayCnt2[0]["userDayCnt"] == proofCntOneDay1) {
            await conn.query(challengeQuery.updateSuccessCnt, [challengeId, req.user.userId]);
            await conn.query(challengeQuery.updateProof, [challengeId, req.user.userId]);
          }

          return res.status(200).json({
            code: 200,
            success: true,
            message: "create proofPicture",
            proofImage: proofImage.location
          });
        } else {
          return res.status(200).json({
            code: 200,
            success: false,
            message: "You have already completed the number of authentications"
          });
        }
      } else {
        return res.status(200).json({
          code: 200,
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



///////////////보너스 환급///////////////
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

      const [check] = await conn.query(challengeQuery.checkBonus, [userId, challengeId]);
      const [count] = await conn.query(challengeQuery.countBonusUsers, [challengeId]);
      let refundAmount = 0;
      const userCount = count[0].count;

      if (check[0].refund_bonus != 0) {
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

        await conn.query(challengeQuery.successBonusRefund, [refundAmount, challengeId, userId]);
        await conn.query(challengeQuery.successDepositRefund2, [refundAmount, challengeId]);
        next();
      }
      else {
        await conn.query(challengeQuery.successBonusRefund, [1,challengeId, userId]);
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



///////////////자동환급///////////////
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
          else if (achievement_rate < 50) {
            refundAmount = 0;
          }


          refundDepositPoint(userId, refundAmount, challengeId);
          await conn.query(challengeQuery.successDepositRefund, [challengeId, userId]);
        }
        await conn.query(challengeQuery.successDepositRefund2, [allAmount, challengeId]);
        console.log("챌린지ID:", challengeId, "환급총액:", allAmount);
      }
    });
    console.log("보증금 자동환급 성공!");

  } catch (err) {
    console.log(err);
  }
};



///////////////자동카운트///////////////
export const proofCountAuto = async function () {
  try {
    await mysqlConn(async (conn) => {
      const [yesterday] = await conn.query(challengeQuery.getYesterday);
      const [ydayChallenge] = await conn.query(challengeQuery.getYdayChallenge, ["%" + yesterday[0]["dayofweek"] + "%"]);

      for (var i = 0; i < ydayChallenge.length; i++) {
        const challengeId = ydayChallenge[i].challengeId;
        const userId = ydayChallenge[i].userId;

        const [proofCntOneDay] = await conn.query(challengeQuery.getProofCntOneDay, [challengeId]);
        const [userYdayCnt] = await conn.query(challengeQuery.getUserYdayCnt, [challengeId, userId]);

        if (proofCntOneDay[0]["proofCountOneDay"] != userYdayCnt[0]["userYdayCnt"]) {
          await conn.query(challengeQuery.deleteProofImage, [challengeId, userId]);
          await conn.query(challengeQuery.updateFailCnt, [challengeId, userId]);
          console.log("challengeId:", challengeId, "userId:", userId, "fail");
        }
      }
    });
    console.log("자동 카운트 성공");
  } catch (err) {
    console.log(err);
  }
};