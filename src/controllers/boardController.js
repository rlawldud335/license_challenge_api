import { mysqlConn } from "../db";
const boardQuery = require("../queries/boardQuery");


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

export const createFreeBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    const body = req.body;
    const image = req.files;
    const path = image.map(img => img.location);

    console.log("s3 freeboardImage 경로 :", path);

    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.createFreeBoard, [
        req.user.userId,
        body.title,
        body.content,
        path.toString()
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create freeboard',
        image: path
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
    var path;
    const body = req.body;

    if (req.files["image"] && req.files["image"].length > 0) {
      const image = req.files["image"][0];
      path = image.location.toString();
    } else {
      path = "";
    }
    const previewFile = req.files["previewFile"][0];
    const allFile = req.files["allFile"][0];

    console.log("s3 saleBoardImage 경로 :", path);
    console.log("s3 previewFile 경로 :", previewFile.location);
    console.log("s3 allFile 경로 :", allFile.location);

    await mysqlConn(async (conn) => {
      const [data] = await conn.query(boardQuery.createSaleBoard, [
        req.user.userId,
        body.title,
        body.content,
        path
      ]);
      await conn.query(boardQuery.createAttachedFile, [
        data.insertId,
        previewFile.location.toString(),
        allFile.location.toString(),
        body.price
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create saleboard',
        image: path,
        previewFile: previewFile.location,
        allFile: allFile.location
      });
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

export const updateFreeBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    const body = req.body;
    const image = req.files;
    const path = image.map(img => img.location);
    let { boardId } = req.params;

    console.log("s3 freeboardImage 경로 :", path);

    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.updateBoard, [
        body.title,
        body.content,
        path.toString(),
        boardId
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'update freeboard',
        image: path
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateSaleBoard = async (req, res) => {
  if (req.user == 'undefined') {
    return res.status(422).send({ error: "must be sign in" });
  }
  try {
    var path;
    const body = req.body;
    let { boardId } = req.params;

    if (req.files["image"] && req.files["image"].length > 0) {
      const image = req.files["image"][0];
      path = image.location.toString();
    } else {
      path = "";
    }
    const previewFile = req.files["previewFile"][0];
    const allFile = req.files["allFile"][0];

    console.log("s3 saleBoardImage 경로 :", path);
    console.log("s3 previewFile 경로 :", previewFile.location);
    console.log("s3 allFile 경로 :", allFile.location);

    await mysqlConn(async (conn) => {
      await conn.query(boardQuery.updateBoard, [
        body.title,
        body.content,
        path,
        boardId
      ]);
      await conn.query(boardQuery.updateAttachedFile, [
        previewFile.location.toString(),
        allFile.location.toString(),
        body.price,
        boardId
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'update saleboard',
        image: path,
        previewFile: previewFile.location,
        allFile: allFile.location
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
      await conn.query(boardQuery.updateComment, [
        body.content,
        commentId
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