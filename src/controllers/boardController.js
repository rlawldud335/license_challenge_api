import { mysqlconn, mgconn } from "../db";
const boardQuery = require("../queries/boardQuery");

export const getAllBoard = async (req, res) => {
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(boardQuery.getAllBoard);
    const rows = data[0];
    return res.json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};

export const getBoard = async (req, res) => {
  let { boardId } = req.params;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const bdata = await conn.query(boardQuery.getBoard, [boardId]);
    const cdata = await conn.query(boardQuery.getComment, [boardId]);

    const myArray = [];
    myArray.push(bdata[0]);
    myArray.push(cdata[0]);

    return res.json(myArray);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};

export const createBoard = async (req, res) => {
  const body = req.body;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(boardQuery.createBoard, [
      body.boardId,
      body.userId,
      body.category,
      body.title,
      body.content,
      new Date(body.createDt),
      body.image,
      body.editDt,
      body.reportCnt,
    ]);
    //return res.json(data[0]);
    return res.send("create success!");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};

export const deleteBoard = async (req, res) => {
  let { boardId } = req.params;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const del = await conn.query(boardQuery.deleteBoard, [boardId]);
    //return res.json(del);
    return res.send("delete success!");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};

////////////////////////////////COMMENT/////////////////////////////////////////

export const createComment = async (req, res) => {
  const body = req.body;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(boardQuery.createComment, [
      body.commentId,
      body.boardId,
      body.userId,
      body.content,
      new Date(body.createDt),
      new Date(body.editDt),
      body.level,
      body.precedingComment,
    ]);
    //return res.json(data[0]);
    return res.send("create success!");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};

export const deleteComment = async (req, res) => {
  let { boardId, commentId } = req.params;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const del = await conn.query(boardQuery.deleteComment, [
      boardId,
      commentId,
    ]);
    //return res.json(del);
    return res.send("delete success!");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};
