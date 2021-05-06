import express from "express";

const licenseRouter = express.Router();
const licenseController = require("../controllers/licenseController");

// read 30 license
licenseRouter.get("/all/:pageNum", licenseController.get30License);

// read Detail license
licenseRouter.get("/read/:licenseId", licenseController.getLicense);

export default licenseRouter;