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
        body.title,
        body.content,
        image.location
      ]);
      await conn.query(boardQuery.createAttachedFile, [
        body.previewFile,
        body.allFile,
        body.price
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

export const deleteBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
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

export const searchBoard = async (req, res) => {
  try {
    const {
      query: { keyword },
    } = req;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.searchBoard, [keyword]);
      return res.status(200).json(data);     
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getBoardsOfWriter = async (req, res) => {
  try {
    const {
      query: { writer },
    } = req;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(boardQuery.getBoardsOfWriter, [writer]);
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
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    let { boardId } = req.params;
    const body = req.body;
    const userId = req.user.userId;
    console.log(body);
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.createComment, [
        boardId,
        userId,
        body.content,
        body.level,
        body.precedingComment,
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create comment'
      });
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

export const updateComment = async (req, res) => {
  try {
    let { boardId, commentId } = req.params;
    const body = req.body;
    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.updateComment, [
        body.content,
        commentId
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'update comment'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};