import express from "express";
import {
    chargePoint,
    getPoint,
    usePoint,
    withdrawPoint,
    getPointHistory
} from "../controllers/pointController";

const pointRouter = express.Router();

pointRouter.get("/history", getPointHistory);
pointRouter.get("/", getPoint);
pointRouter.post("/charge", chargePoint);
pointRouter.post("/withdraw", withdrawPoint);
pointRouter.post("/payment", usePoint);


export default pointRouter;