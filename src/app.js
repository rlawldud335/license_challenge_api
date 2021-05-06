import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import routes from "./routes";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./passport";
import dotenv from "dotenv";
import challengeRouter from "./routes/challengeRouter";
import boardRouter from "./routes/boardRouter";
import licenseRouter from "./routes/licenseRouter";
import licenseScheduleRouter from "./routes/licenseScheduleRouter";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODBCONN }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.auth, authRouter);
app.use(routes.challenge, challengeRouter);
app.use(routes.board, boardRouter);
app.use(routes.license, licenseRouter);
app.use(routes.licenseSchedule, licenseScheduleRouter);

export default app;
