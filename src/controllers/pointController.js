import { mysqlConn } from "../db";
const pointQuery = require("../queries/pointQuery");

export const chargePoint = async (req, res) => {
  const userId = req.user.userId;
  const point = req.body.point;
  const merchant_uid = req.body.merchant_uid;

  try {
    await mysqlConn(async (conn) => {
      const [data] = await conn.query(pointQuery.successPayment, [merchant_uid]);
      const [data2] = await conn.query(pointQuery.chargePoint, [userId, point, userId, point, point, userId]);
      const [data3] = await conn.query(pointQuery.plusBalance, [point, userId]);

      const [balance] = await conn.query(pointQuery.getPoint, [userId]);

      return res.status(200).json({
        code: 200,
        success: true,
        message: 'Charge Point',
        userId: balance[0]["userId"],
        balance: balance[0]["point"]
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const withdrawPoint = async (req, res) => {
  const userId = req.user.userId;
  const currentPoint = req.user.point;
  const point = req.body.point;
  try {
    if (currentPoint < point) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: 'Insufficient balance',
        userId: userId,
        balance: currentPoint,
        "Required Point": point - currentPoint
      });
    } else {
      await mysqlConn(async (conn) => {

        const [data] = await conn.query(pointQuery.withdrawPoint, [userId, point, userId, point]);
        const [data2] = await conn.query(pointQuery.minusBalance, [point, userId]);
        const [balance] = await conn.query(pointQuery.getPoint, [userId]);

        return res.status(200).json({
          code: 200,
          success: true,
          message: 'Withdraw Point',
          userId: balance[0]["userId"],
          balance: balance[0]["point"]
        });

      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// export const getPoint = async (req, res) => {
//   const userId = req.user.userId;
//   try {
//     await mysqlConn(async (conn) => {
//       const [balance] = await conn.query(pointQuery.getPoint, [userId]);
//       return res.status(200).json(balance[0]);
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// };

export const getPoint = async (req, res, next) => {
  try {
    return res.status(200).json({
      userId: req.user.userId,
      point: req.user.point
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const usePoint = async (req, res, next) => {
  const userId = req.user.userId;

  console.log(req.body)

  if (req.body.hasOwnProperty('create')) {
    var targetType = "챌린지 생성";
    var targetId = req.body.challengeId;
    var point = req.body.deposit;
  }
  else if (req.body.hasOwnProperty('challengeId')) {
    var targetType = "챌린지 보증금";
    var targetId = req.body.challengeId;
    var point = req.body.deposit;
  }
  else if (req.body.hasOwnProperty('fileId')) {
    var targetType = "첨부파일";
    var targetId = req.body.fileId;
    var point = req.body.point;
  }


  try {
    await mysqlConn(async (conn) => {
      const [balance] = await conn.query(pointQuery.getPoint, [userId]);

      if (parseInt(balance[0]["point"]) < point) {
        return res.status(200).json({
          code: 200,
          success: false,
          message: 'Insufficient balance',
          userId: balance[0]["userId"],
          balance: balance[0]["point"],
          "Required Point": point - parseInt(balance[0]["point"])
        });

      } else {
        const [data] = await conn.query(pointQuery.usePoint, [userId, targetType + " 결제", targetId, point, userId, point]);
        const [data2] = await conn.query(pointQuery.minusBalance, [point, userId]);
        const [balance2] = await conn.query(pointQuery.getPoint, [userId]);

        // return res.status(200).json({
        //   code: 200,
        //   success: true,
        //   message: 'Use Point',
        //   userId: balance2[0]["userId"],
        //   targetType: targetType,
        //   targetId: targetId,
        //   "Payment amount": point,
        //   balance: balance2[0]["point"]
        // });

        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const earnPoint = async (req, res) => {
  const userId = req.user.userId;
  const point = req.body.point;
  const targetType = req.body.targetType;
  const targetId = req.body.targetId;

  console.log(req.body)

  try {
    await mysqlConn(async (conn) => {
      await conn.query(pointQuery.earnPoint, [userId, targetType, targetId, point, userId, point]);
      await conn.query(pointQuery.plusBalance, [point, userId]);
      const [balance2] = await conn.query(pointQuery.getPoint, [userId]);

      if(req.body.success==false){
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Earn Point",
          userId: balance2[0]["userId"],
          targetType: targetType,
          targetId: targetId,
          "Earn amount": point,
          balance: balance2[0]["point"]
        });

      }

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Earn Point",
        userId: balance2[0]["userId"],
        targetType: targetType,
        targetId: targetId,
        "Earn amount": point,
        balance: balance2[0]["point"]
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const refundDepositPoint = async function (userId, point, targetId) {
  try {
    let targetType = "챌린지 보증금 환급";
    await mysqlConn(async (conn) => {
      const [data] = await conn.query(pointQuery.earnPoint, [userId, targetType, targetId, point, userId, point]);
      const [data2] = await conn.query(pointQuery.plusBalance, [point, userId]);
      const [balance2] = await conn.query(pointQuery.getPoint, [userId]);
    });
  } catch (err) {
    console.log(err);
  }
};


export const getPointHistory = async (req, res) => {
  console.log("포인트내역조회")
  const userId = req.user.userId;
  const {
    query: { pageNum, numOfRows },
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const query = pointQuery.getPointHistory + pageNum * numOfRows + "," + numOfRows;
      const [data] = await conn.query(query, [userId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};




//////////////////////////결제요청(Payments)/////////////////////////
export const requestPay = async (req, res) => {
  try {
    const buyer = req.user;
    const body = req.body;
    const merchant_uid = buyer.userId + "-" + new Date().getTime();

    await mysqlConn(async (conn) => {
      const [data] = await conn.query(pointQuery.requestPayment,
        [
          merchant_uid,
          body.amount,
          body.amount,
          body.pay_method,
          buyer.userId
        ]);

      return res.status(200).json({
        code: 200,
        success: true,
        message: "request payment",
        merchant_uid: merchant_uid,
        pay_method: body.pay_method,
        amount: body.amount,
        buyer_email: buyer.email,
        buyer_tel: buyer.phoneNumber
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};