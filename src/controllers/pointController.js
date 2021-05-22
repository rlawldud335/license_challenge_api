import { mysqlConn } from "../db";
const pointQuery = require("../queries/pointQuery");

export const chargePoint = async (req, res) => {
    console.log("1번")
    const userId = req.user.userId;
    const {
        query: { chargePoint },
      } = req;
    try {
      await mysqlConn(async (conn) => {
        const [data, schema] = await conn.query(pointQuery.chargePoint,[userId,chargePoint,userId,chargePoint]);
        const [data2, schema2] = await conn.query(pointQuery.sumBalance,[chargePoint,userId]);
        return res.status(200).json(data);     
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
};