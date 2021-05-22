import express from "express";
import {
    chargePoint
} from "../controllers/pointController";

const pointRouter = express.Router();

pointRouter.post("/chargePoint", chargePoint);

export default pointRouter;