//authenticate
const AUTH = "/auth";
const GITHUB = "/github";
const GITHUB_CALLBACK = "/github/callback";
const KAKAO = "/kakao";
const KAKAO_CALLBACK = "/kakao/callback";
const NAVER = "/naver";
const NAVER_CALLBACK = "/naver/callback";

//licenseSchedule
const LICENSESCHEDULE = "/:licenseId";

//license
const LICENSE = "/license";
const LICENSEDETAIL = "/id/:licenseId";
const SEARCHLICENSE = "/name/:searchWord";

//challenge
const CHALLENGE = "/challenge";

//board
const BOARD = "/board";
const FREEBOARD = "/freeboard";
const SALEBOARD = "/saleboard";
const FREEBOARDDETAIL = "/freeboard/:boardId";
const SALEBOARDDETAIL = "/saleboard/:boardId";
const SEARCHBOARD = "/content/:keyword";
const BOARDCOMMENT = "/:boardId/comment";
const BOARDCOMMENTDETAIL = "/:boardId/comment/:commentId";

//user
const USER = "/user";

//gifticon
const GIFTICON = "/gifticon";

//point
const POINT = "/point"

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
  freeBoard: FREEBOARD,
  saleBoard: SALEBOARD,
  freeBoardDetail: FREEBOARDDETAIL,
  saleBoardDetail: SALEBOARDDETAIL,
  searchBoard: SEARCHBOARD,
  boardComment: BOARDCOMMENT,
  boardCommentDetail: BOARDCOMMENTDETAIL,
  user: USER,
  gifticon: GIFTICON,
  point: POINT,
};

export default routes;
