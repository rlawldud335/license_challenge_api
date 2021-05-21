import express from "express";
import routes from "../routes";
import { getManyLicense, getLicense, searchLicense } from "../controllers/licenseController";

const licenseRouter = express.Router();

// read Detail license
licenseRouter.get(routes.licenseDetail, getLicense);

// search license
licenseRouter.get(routes.searchLicense, searchLicense)

// read many license
licenseRouter.get("/", getManyLicense);

export default licenseRouter;
