import express from "express";
import routes from "../routes"

const licenseRouter = express.Router();
const licenseController = require("../controllers/licenseController");

// read 30 license
licenseRouter.get(routes.licenseAll, licenseController.get30License);

// read Detail license
licenseRouter.get(routes.licenseDetail, licenseController.getLicense);

export default licenseRouter;