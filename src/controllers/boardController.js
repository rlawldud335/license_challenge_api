import { mysqlConn } from "../db";
const boardQuery = require("../queries/boardQuery");

export const get30Board = async (req, res) => {
  try {
    const {
      query: { pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = boardQuery.get30Board + pageNum * 30 + "," + numOfRows;
      const [data, schema] = await conn.query(query);
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
      const [bdata, schema1] = await conn.query(boardQuery.getBoard, [boardId]);
      const [cdata, schema2] = await conn.query(boardQuery.getComment, [boardId]);
      let myArray = [];
      myArray.push(bdata);
      myArray.push(cdata);
      return res.status(200).json(myArray);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createBoard = async (req, res) => {
  try {
    const body = req.body;
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.createBoard, [
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
      return res.status(200).json("success");
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
      return res.status(200).json("success!");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

////////////////////////////////COMMENT/////////////////////////////////////////

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
    await conn.query(boardQuery.deleteComment, [boardId, commentId]);
    return res.status(200).json("success");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
