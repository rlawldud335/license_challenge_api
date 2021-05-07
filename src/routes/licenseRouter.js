import express from "express";
import routes from "../routes";
import { get30License, getLicense } from "../controllers/licenseController";

const licenseRouter = express.Router();

// read 30 license
licenseRouter.get("/", get30License);

// read Detail license
licenseRouter.get(routes.licenseDetail, getLicense);

export default licenseRouter;
