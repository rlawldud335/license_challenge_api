export const postChallenge = async (req, res) => {
  const conn = await mysqlconn.getConnection(async (conn) => conn);
  const [[user]] = await conn.query("SELECT * FROM `user` WHERE `email`=?", [
    email,
  ]);
  res.status(200);
};
