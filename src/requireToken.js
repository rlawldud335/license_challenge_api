import jwt from "jsonwebtoken";
import { mysqlConn } from "./db";
import dotenv from "dotenv";

dotenv.config();

module.exports = (req, res, next) => {
  const { Authorization } = req.headers;
  if (!Authorization) {
    return res.status(401).send({ error: "you must be logged in" });
  }
  console.log(Authorization);
  const token = Authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in 2" });
    }
    const { userId } = payload;
    console.log(userId);
    await mysqlConn(async (conn) => {
      const [[user]] = await conn.query(
        "SELECT * FROM `user` WHERE `userId`=?",
        [userId]
      );
      req.user = user;
    });
    next();
  });
};
