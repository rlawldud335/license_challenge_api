import { mysqlConn } from "../db";
const boardQuery = require("../queries/boardQuery");

export const get30Board = async (req, res) => {
  try {
    const {
      query: { category, pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = boardQuery.get30Board + pageNum * 30 + "," + numOfRows;
      const [data, schema] = await conn.query(query, [category]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getBoard = async (req, res) => {
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.getBoard, [boardId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createBoard = async (req, res) => {
  const body = req.body;

  try {
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.createBoard, [
        body.userId,
        body.category,
        body.title,
        body.content,
        body.image
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create board'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteBoard = async (req, res) => {
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.deleteBoard, [boardId]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'delete board'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};



////////////////////////////////COMMENT/////////////////////////////////////////

export const getComment = async (req, res) => {
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.getComment, [boardId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createComment = async (req, res) => {
  try {
    const body = req.body;
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.createComment, [
        body.commentId,
        body.boardId,
        body.userId,
        body.content,
        new Date(body.createDt),
        new Date(body.editDt),
        body.level,
        body.precedingComment,
      ]);
      return res.status(200).json("success");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteComment = async (req, res) => {
  try {
    let { boardId, commentId } = req.params;
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.deleteComment, [boardId, commentId]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'delete comment'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};