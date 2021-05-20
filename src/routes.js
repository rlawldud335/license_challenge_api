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
const LICENSEDETAIL = "/:licenseId";
const SEARCHLICENSE = "/:searchWord";

//challenge
const CHALLENGE = "/challenge";

//board
const BOARD = "/board";
const BOARDDETAIL = "/:boardId";
const BOARDCOMMENT = "/:boardId/comment";
const BOARDCOMMENTDETAIL = "/:boardId/comment/:commentId";

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
  searchLicense: SEARCHLICENSE,
  licenseSchedule: LICENSESCHEDULE,
  challenge: CHALLENGE,
  board: BOARD,
  boardDetail: BOARDDETAIL,
  boardComment: BOARDCOMMENT,
  boardCommentDetail: BOARDCOMMENTDETAIL,
  user: USER,
  gifticon: GIFTICON,
};

export default routes;
