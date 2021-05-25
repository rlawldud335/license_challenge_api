import express from "express";
import routes from "../routes";
import {
    chargePoint,
    getPoint,
    usePoint,
    withdrawPoint,
    getPointHistory,
    earnPoint,
    requestPay
} from "../controllers/pointController";

const pointRouter = express.Router();

pointRouter.get("/", getPoint);
pointRouter.get("/history", getPointHistory);

pointRouter.post("/payment", requestPay);
pointRouter.post("/charge", chargePoint);
pointRouter.post("/withdraw", withdrawPoint);
pointRouter.post("/use", usePoint);
pointRouter.post("/earn", earnPoint);


export default pointRouter;