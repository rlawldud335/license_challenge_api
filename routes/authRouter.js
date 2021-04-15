import express from "express";
import routes from "../routes";
import { resCallback } from "../controllers/authController";
import passport from "passport";

const authRouter = express.Router();

authRouter.get(routes.github, passport.authenticate("github"));
authRouter.get(
  routes.githubCallback,
  passport.authenticate("github"),
  resCallback
);

authRouter.get(routes.kakao, passport.authenticate("kakao"));
authRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao"),
  resCallback
);

authRouter.get(routes.naver, passport.authenticate("naver"));
authRouter.get(
  routes.naverCallback,
  passport.authenticate("naver"),
  resCallback
);

export default authRouter;
