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
const LICENSEDETAIL = "/:licenseId";
const SEARCHLICENSE = "/search";

//challenge
const CHALLENGE = "/challenge";

//board
const BOARD = "/board";
const BOARDDETAIL = "/:boardId";
const SEARCHBOARD = "/search";
const GETBOARDSOFWRITER = "/search-who"
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
  getBoardsOfWriter: GETBOARDSOFWRITER,
  licenseSchedule: LICENSESCHEDULE,
  challenge: CHALLENGE,
  board: BOARD,
  boardDetail: BOARDDETAIL,
  searchBoard: SEARCHBOARD,
  boardComment: BOARDCOMMENT,
  boardCommentDetail: BOARDCOMMENTDETAIL,
  user: USER,
  gifticon: GIFTICON,
  point: POINT,
};

export default routes;
