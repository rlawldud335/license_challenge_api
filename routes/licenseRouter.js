import express from "express";

const licenseRouter = express.Router();
const licenseController = require("../controllers/licenseController");

// readAll license
licenseRouter.get("/all", licenseController.getAllLicense);

// readDetail license
licenseRouter.get("/read/:licenseId", licenseController.getLicense);

export default licenseRouter;