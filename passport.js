import dotenv from "dotenv";
import passport from "passport";
import GithubStreategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import {
  GithubCallback,
  KakaoCallback,
  NaverCallback,
} from "./controllers/authController";

dotenv.config();

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_KEY,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: `${process.env.HOST}:${process.env.PORT}/auth/naver/callback`,
    },
    NaverCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_KEY,
      clientSecret: process.env.KAKAO_SECRET,
      callbackURL: `${process.env.HOST}:${process.env.PORT}/auth/kakao/callback`,
    },
    KakaoCallback
  )
);

passport.use(
  new GithubStreategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `${process.env.HOST}:${process.env.PORT}/auth/github/callback`,
    },
    GithubCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
