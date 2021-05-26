import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import routes from "./routes";
import dotenv from "dotenv";
import challengeRouter from "./routes/challengeRouter";
import boardRouter from "./routes/boardRouter";
import licenseRouter from "./routes/licenseRouter";
import licenseScheduleRouter from "./routes/licenseScheduleRouter";
import pointRouter from "./routes/pointRouter";
import userRouter from "./routes/userRouter";
import reportRouter from "./routes/reportRouter";
import cors from "cors";
import requireToken from "./requireToken";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors());

app.use(routes.auth, authRouter);
app.use(requireToken);
app.use(routes.point, pointRouter);
app.use(routes.challenge, challengeRouter);
app.use(routes.board, boardRouter);
app.use(routes.user, userRouter);
app.use(routes.report, reportRouter);
app.use(routes.license, licenseRouter);
app.use(routes.licenseSchedule, licenseScheduleRouter);

export default app;
