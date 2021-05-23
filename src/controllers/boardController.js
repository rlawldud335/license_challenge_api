import { mysqlConn } from "../db";
const boardQuery = require("../queries/boardQuery");

export const getFreeBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    const {
      query: { pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = boardQuery.getFreeBoard + pageNum * numOfRows + "," + numOfRows;
      const [data, schema] = await conn.query(query);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getSaleBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    const {
      query: { pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = boardQuery.getSaleBoard + pageNum * numOfRows + "," + numOfRows;
      const [data, schema] = await conn.query(query);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getFreeBoardDetail = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.getFreeBoardDetail, [boardId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getSaleBoardDetail = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.getSaleBoardDetail, [boardId]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createFreeBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    const body = req.body;
    const image = req.file;
    console.log("s3 board이미지 경로 :", image.location);

    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.createFreeBoard, [
        req.user.userId,
        body.category,
        body.title,
        body.content,
        image.location
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create freeboard',
        image: image.location
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createSaleBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    const body = req.body;
    const image = req.file;
    console.log("s3 board이미지 경로 :", image.location);

    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.createSaleBoard, [
        req.user.userId,
        body.category,
        body.title,
        body.content,
        image.location
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create saleboard',
        image: image.location
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteFreeBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      const [[board]] = await conn.query("SELECT * FROM 'board' WHERE 'boardId'=?", [boardId]);
      if(board.userId != req.user.userId) {
        return res.status(422).send({error: "You do not have permission"});
      }
      await conn.query(boardQuery.deleteFreeBoard, [boardId]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'delete freeboard'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteSaleBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    let { boardId } = req.params;
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.deleteSaleBoard, [boardId]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'delete saleboard'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const searchBoard = async (req, res) => {
  let { keyword } = req.params;
  try {
    await mysqlConn(async (conn) => {
      const query = boardQuery.searchBoard;
      const [data, schema] = await conn.query(query, [keyword]);
      return res.status(200).json(data);
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