import { mysqlconn, mgconn } from "../db";
const boardQuery = require("../queries/boardQuery");

export const getAllBoard = async (req, res) => {
    try {
      const conn = await mysqlconn.getConnection(async (conn) => conn);
      const data = await conn.query(boardQuery.getAllBoard);
      const rows = data[0];
      return res.json(rows);
    } catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
};

export const getBoard = async (req, res) => {
    let { boardId } = req.params;
    try {
      const conn = await mysqlconn.getConnection(async (conn) => conn);
      const data = await conn.query(boardQuery.getBoard, [boardId]);
      const rows = data[0];
      return res.json(rows[0]);
    } catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
};

export const createBoard = async(req, res) => {
    const body = req.body;
    try {
        const conn = await mysqlconn.getConnection(async (conn) => conn);
        const data = await conn.query(boardQuery.createBoard, 
            [
                body.boardId,
                body.userId,
                body.category,
                body.title,
                body.content,
                new Date(body.createDt),
                body.image,
                body.editDt,
                body.reportCnt
            ]);
        //return res.json(data[0]);
        return res.send("create success!");
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const deleteBoard = async (req, res) => {
    let { boardId } = req.params;
    try {
      const conn = await mysqlconn.getConnection(async (conn) => conn);
      const del = await conn.query(boardQuery.deleteBoard, [boardId]);
      //return res.json(del);
      return res.send("delete success!");
    } catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
};
