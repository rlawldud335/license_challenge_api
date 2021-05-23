import { mysqlConn } from "../db";
const pointQuery = require("../queries/pointQuery");

export const chargePoint = async (req, res) => {
  const userId = req.user.userId;
  const {
    query: { point },
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(pointQuery.chargePoint, [userId, point, userId, point]);
      const [data2, schema2] = await conn.query(pointQuery.plusBalance, [point, userId]);
      const [balance, schema3] = await conn.query(pointQuery.getPoint, [userId]);
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
  const {
    query: { point },
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const [balance, schema3] = await conn.query(pointQuery.getPoint, [userId]);

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
        const [data, schema] = await conn.query(pointQuery.withdrawPoint, [userId, point, userId, point]);
        const [data2, schema2] = await conn.query(pointQuery.minusBalance, [point, userId]);
        const [balance2, schema3] = await conn.query(pointQuery.getPoint, [userId]);
        return res.status(200).json({
          code: 200,
          success: true,
          message: 'Withdraw Point',
          userId: balance2[0]["userId"],
          balance: balance2[0]["point"]
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getPoint = async (req, res) => {
  const userId = req.user.userId;
  try {
    await mysqlConn(async (conn) => {
      const [balance, schema] = await conn.query(pointQuery.getPoint, [userId]);
      return res.status(200).json(balance[0]);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const usePoint = async (req, res) => {
  const userId = req.user.userId;
  const {
    query: { point, targetType, targetId },
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const [balance, schema3] = await conn.query(pointQuery.getPoint, [userId]);

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
        const [data, schema] = await conn.query(pointQuery.usePoint, [userId, targetType + " 결제", targetId, point, userId, point]);
        const [data2, schema2] = await conn.query(pointQuery.minusBalance, [point, userId]);
        const [balance2, schema3] = await conn.query(pointQuery.getPoint, [userId]);

        return res.status(200).json({
          code: 200,
          success: true,
          message: 'Use Point',
          userId: balance2[0]["userId"],
          targetType: targetType,
          targetId: targetId,
          "Payment amount": point,
          balance: balance2[0]["point"]
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const earnPoint = async (req, res) => {
  const userId = req.user.userId;
  const {
    query: { point, targetType, targetId },
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(pointQuery.earnPoint, [userId, targetType, targetId, point, userId, point]);
      const [data2, schema2] = await conn.query(pointQuery.plusBalance, [point, userId]);
      const [balance2, schema3] = await conn.query(pointQuery.getPoint, [userId]);

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

export const getPointHistory = async (req, res) => {
  console.log("포인트내역조회")
  const userId = req.user.userId;
  const {
    query: { pageNum, numOfRows },
  } = req;
  try {
    await mysqlConn(async (conn) => {
      const query = pointQuery.getPointHistory + pageNum * numOfRows + "," + numOfRows;
      const [data, schema] = await conn.query(query, [userId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};