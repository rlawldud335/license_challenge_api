import express from "express";
import routes from "../routes";
import passport from "passport";

const authRouter = express.Router();

authRouter.get(routes.github, passport.authenticate("github"));
authRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/auth/github",
  }),
  (req, res) => {
    res.redirect(`exp://127.0.0.1:19000?uid=${req.user.userId}`);
  }
);

authRouter.get(routes.kakao, passport.authenticate("kakao"));
authRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {
    failureRedirect: "/auth/kakao",
  }),
  (req, res) => {
    res.redirect(`exp://127.0.0.1:19000?uid=${req.user.userId}`);
  }
);

authRouter.get(routes.naver, passport.authenticate("naver"));
authRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", {
    failureRedirect: "/auth/naver",
  }),
  (req, res) => {
    res.redirect(`exp://127.0.0.1:19000?uid=${req.user.userId}`);
  }
);

export default authRouter;
