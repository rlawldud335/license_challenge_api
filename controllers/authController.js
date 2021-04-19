import { mysqlconn, mgconn } from "../db";

//github callback respose
export const resCallback = (req, res) => {
  res.status(200);
  res.json(req.user);
  res.end();
};

//github login
export const GithubCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email, avatar_url },
  } = profile;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const [[user]] = await conn.query("SELECT * FROM `user` WHERE `email`=?", [
      email,
    ]);
    if (user) {
      await conn.query("UPDATE `user` SET `githubId` = ? WHERE `email` = ?", [
        id,
        email,
      ]);
      return cb(null, user);
    }
    const newUser = await conn.query(
      "INSERT INTO user(email,nickname,profileImage,githubId) VALUES(?,?,?,?)",
      [email, name, avatar_url, id]
    );
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
//kakao login
export const KakaoCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      properties: { nickname, profile_image },
      kakao_account: { email },
    },
  } = profile;
  console.log(id, nickname, profile_image, email);
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const [[user]] = await conn.query("SELECT * FROM `user` WHERE `email`=?", [
      email,
    ]);
    if (user) {
      await conn.query("UPDATE `user` SET `kakaoId` = ? WHERE `email` = ?", [
        id,
        email,
      ]);
      return cb(null, user);
    }
    const newUser = await conn.query(
      "INSERT INTO user(email,nickname,profileImage,kakaoId) VALUES(?,?,?,?)",
      [email, nickname, profile_image, id]
    );
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
//naver login
export const NaverCallback = async (_, __, profile, cb) => {
  console.log(profile);
  const {
    _json: { id, nickname, profile_image, email },
  } = profile;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const [[user]] = await conn.query("SELECT * FROM `user` WHERE `email`=?", [
      email,
    ]);
    if (user) {
      await conn.query("UPDATE `user` SET `naverId` = ? WHERE `email` = ?", [
        id,
        email,
      ]);
      return cb(null, user);
    }
    const newUser = await conn.query(
      "INSERT INTO user(email,nickname,profileImage,naverId) VALUES(?,?,?,?)",
      [email, nickname, profile_image, id]
    );
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
