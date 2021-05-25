import express from "express";
import routes from "../routes";
import {readUserInfo, updateUserInfo, withdrawal} from "../controllers/userController";

const userRouter = express.Router();

// 회원정보 조회
userRouter.get(routes.userInfo, readUserInfo);
// 회원정보 수정
userRouter.post(routes.userInfo, updateUserInfo);
// 회원 탈퇴
userRouter.delete(routes.withdrawal, withdrawal);

export default userRouter;