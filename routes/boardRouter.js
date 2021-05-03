import express from "express";
const boardController = require("../controllers/boardController");

const boardRouter = express.Router();

//readAll board
boardRouter.get("/", boardController.getAllBoard);

//readDetail board
boardRouter.get("/:boardId", boardController.getBoard);

//create board
boardRouter.post("/write", boardController.insertBoard);

//delete board
boardRouter.delete("/:boardId", boardController.deleteBoard);

export default boardRouter;