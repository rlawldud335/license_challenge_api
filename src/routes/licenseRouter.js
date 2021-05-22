import express from "express";
import routes from "../routes";
import { getManyLicense, getLicense, searchLicense } from "../controllers/licenseController";

const licenseRouter = express.Router();

// search license
licenseRouter.get(routes.searchLicense, searchLicense)

// read Detail license
licenseRouter.get(routes.licenseDetail, getLicense);

// read many license
licenseRouter.get("/", getManyLicense);

export default licenseRouter;
