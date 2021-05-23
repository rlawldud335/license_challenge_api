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
const MYSCHEDULE = "/my"; 

//license
const LICENSE = "/license";
const LICENSEDETAIL = "/:licenseId";
const SEARCHLICENSE = "/search";

//challenge
const CHALLENGE = "/challenge";

//board
const BOARD = "/board";
const FREEBOARD = "/freeboard";
const SALEBOARD = "/saleboard";
const FREEBOARDDETAIL = "/freeboard/:boardId";
const SALEBOARDDETAIL = "/saleboard/:boardId";
const SEARCHBOARD = "/search";
const GETBOARDSOFWRITER = "/search-who";
const BOARDDETAIL = "/:boardId";
const BOARDCOMMENT = "/:boardId/comment";
const BOARDCOMMENTDETAIL = "/:boardId/comment/:commentId";

//user
const USER = "/user";

//gifticon
const GIFTICON = "/gifticon";

//point
const POINT = "/point";

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
  getBoardsOfWriter: GETBOARDSOFWRITER,
  licenseSchedule: LICENSESCHEDULE,
  mySchedule: MYSCHEDULE,
  challenge: CHALLENGE,
  board: BOARD,
  freeBoard: FREEBOARD,
  saleBoard: SALEBOARD,
  freeBoardDetail: FREEBOARDDETAIL,
  saleBoardDetail: SALEBOARDDETAIL,
  searchBoard: SEARCHBOARD,
  boardDetail: BOARDDETAIL,
  boardComment: BOARDCOMMENT,
  boardCommentDetail: BOARDCOMMENTDETAIL,
  user: USER,
  gifticon: GIFTICON,
  point: POINT,
};

export default routes;
