import express from "express";
import routes from "../routes";
import { getLicenseSchedule, getMySchedule } from "../controllers/licenseScheduleController";

const licenseScheduleRouter = express.Router();

// 로그인 된 사용자가 참여한 챌린지의 자격증 일정 조회
licenseScheduleRouter.get(routes.mySchedule, getMySchedule);
// read Detail licenseSchedule
licenseScheduleRouter.get(routes.licenseSchedule, getLicenseSchedule);

export default licenseScheduleRouter;
