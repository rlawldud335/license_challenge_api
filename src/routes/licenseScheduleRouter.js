import express from "express";
import { getLicenseSchedule } from "../controllers/licenseScheduleController";

const licenseScheduleRouter = express.Router();

// readDetail licenseSchedule
licenseScheduleRouter.get("/read/:scheduleId", getLicenseSchedule);

export default licenseScheduleRouter;
