import express from "express";

const licenseScheduleRouter = express.Router();
const licenseScheduleController = require("../controllers/licenseScheduleController");

// readDetail licenseSchedule
licenseScheduleRouter.get("/read/:scheduleId", licenseScheduleController.getLicenseSchedule);

export default licenseScheduleRouter;