import express from "express";
import routes from "../routes";
import { getLicenseSchedule } from "../controllers/licenseScheduleController";

const licenseScheduleRouter = express.Router();

// read Detail licenseSchedule
licenseScheduleRouter.get(routes.licenseSchedule, getLicenseSchedule);

export default licenseScheduleRouter;
