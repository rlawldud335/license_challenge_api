import express from "express";
import jwt from "jsonwebtoken";
import { mysqlConn } from "../db";
import dotenv from "dotenv";

dotenv.config();

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  try {
    await mysqlConn(async (conn) => {
      const [[user]] = await conn.query(
        "SELECT * FROM `user` WHERE `email`=?",
        [email]
      );
      if (user) {
        return res.status(401).send({ error: "This email exists" });
      }
      const result = await conn.query(
        "INSERT INTO user(email,password) VALUES(?,?)",
        [email, password]
      );
      const newUserId = result[0].insertId;
      console.log(newUserId);
      const token = jwt.sign(
        {
          userId: newUserId,
        },
        process.env.JWT_KEY
      );
      console.log(token);
      return res.send({ token });
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  await mysqlConn(async (conn) => {
    //find user
    const [[user]] = await conn.query("SELECT * FROM `user` WHERE `email`=?", [
      email,
    ]);
    if (!user) {
      return res.status(422).send({ error: "must be sing up" });
    }
    try {
      if (password == user.password) {
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_KEY);
        res.send({ token });
      }
    } catch (error) {
      return res.status(422).send({ error: "must be sing up" });
    }
  });
});

export default authRouter;
