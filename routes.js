//authenticate
const AUTH = "/auth";
const GITHUB = "/github";
const GITHUB_CALLBACK = "/github/callback";
const KAKAO = "/kakao";
const KAKAO_CALLBACK = "/kakao/callback";
const NAVER = "/naver";
const NAVER_CALLBACK = "/naver/callback";

//license
const LICENSE = "/license";

//challenge
const CHALLENGE = "/challenge";

//post
const POST = "/post";

//user
const USER = "/user";

//gifticon
const GIFTICON = "/gifticon";

const routes = {
  auth: AUTH,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  license: LICENSE,
  challenge: CHALLENGE,
  post: POST,
  user: USER,
  gifticon: GIFTICON,
};

export default routes;
