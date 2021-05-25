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
const SEARCHBOARD = "/search";
const GETBOARDSOFWRITER = "/search-who";
const FREEBOARD = "/freeboard";
const SALEBOARD = "/saleboard";
const FREEBOARDDETAIL = "/freeboard/:boardId";
const SALEBOARDDETAIL = "/saleboard/:boardId";
const BOARDDETAIL = "/:boardId";
const BOARDCOMMENT = "/:boardId/comment";
const BOARDCOMMENTDETAIL = "/:boardId/comment/:commentId";

//user
const USER = "/user";
const USERINFO = "/my-info";
const WITHDRAWAL = "/withdrawal";

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
  licenseSchedule: LICENSESCHEDULE,
  mySchedule: MYSCHEDULE,
  challenge: CHALLENGE,
  board: BOARD,
  searchBoard: SEARCHBOARD,
  getBoardsOfWriter: GETBOARDSOFWRITER,
  freeBoard: FREEBOARD,
  saleBoard: SALEBOARD,
  freeBoardDetail: FREEBOARDDETAIL,
  saleBoardDetail: SALEBOARDDETAIL,
  boardDetail: BOARDDETAIL,
  boardComment: BOARDCOMMENT,
  boardCommentDetail: BOARDCOMMENTDETAIL,
  user: USER,
  userInfo: USERINFO,
  withdrawal: WITHDRAWAL,
  gifticon: GIFTICON,
  point: POINT,
};

export default routes;
