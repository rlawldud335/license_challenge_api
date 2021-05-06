//authenticate
const AUTH = "/auth";
const GITHUB = "/github";
const GITHUB_CALLBACK = "/github/callback";
const KAKAO = "/kakao";
const KAKAO_CALLBACK = "/kakao/callback";
const NAVER = "/naver";
const NAVER_CALLBACK = "/naver/callback";

//licenseSchedule
const LICENSESCHEDULE = "/licenseSchedule";

//license
const LICENSE = "/license";
const LICENSEALL = "/get/all/:pageNum";
const LICENSEDETAIL = "/get/:licenseId";

//challenge
const CHALLENGE = "/challenge";

//board
const BOARD = "/board";

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
  licenseDetail: LICENSEDETAIL,
  licenseAll: LICENSEALL,
  licenseSchedule: LICENSESCHEDULE,
  challenge: CHALLENGE,
  board: BOARD,
  user: USER,
  gifticon: GIFTICON,
};

export default routes;
