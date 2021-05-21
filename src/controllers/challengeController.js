import { mysqlConn } from "../db";
const challengeQuery = require("../queries/challengeQuery");

<<<<<<< Updated upstream
=======
export const searchChallenge = async (req, res) => {
  let { keyword } = req.params;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.searchChallenge;   
      const [data, schema] = await conn.query(query,[keyword]);
      return res.status(200).json(data);     
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getOngoingChallenge = async (req, res) => {
  const userId = req.user.userId;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getOngoingChallenge;   
      const [data, schema] = await conn.query(query,[userId]);
      return res.status(200).json(data);     
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getEndedChallenge = async (req, res) => {
  const userId = req.user.userId;
  try {
    await mysqlConn(async (conn) => {
      const query = challengeQuery.getEndedChallenge;   
      const [data, schema] = await conn.query(query,[userId]);
      return res.status(200).json(data);     
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
>>>>>>> Stashed changes

export const getCategoryChallenge = async (req, res) => {
  try {
    const {
      query: { category, pageNum, numOfRows },
    } = req;

    await mysqlConn(async (conn) => {
      if(category=="전체보기"){
        const query = challengeQuery.getAllChallenge + pageNum * 30 + "," + numOfRows;
        const [data, schema] = await conn.query(query);
        return res.status(200).json(data);
      } else {
        const query = challengeQuery.getCategoryChallenge + pageNum * 30 + "," + numOfRows;
        const [data, schema] = await conn.query(query,[category]);
        return res.status(200).json(data);
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


export const getChallenge = async (req, res) => {
  try {
    console.log(req.user)
    let { challengeId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.getChallenge, [
        challengeId,
      ]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const createChallenge = async (req, res) => {
<<<<<<< Updated upstream
  const body = req.body;
  const user = req.user.userId;
  const chgStartDt = new Date(body.chgStartDt);
  const chgEndDt = new Date(body.chgEndDt);
  const challengeTerm = Math.ceil((chgEndDt.getTime()-chgStartDt.getTime())/(1000*3600*24)) * body.proofCountOneDay;
  const challengeTitleImage = req.files["challengeTitleImage"][0];
  const goodProofImage = req.files["goodProofImage"][0];
  const badProofImage = req.files["badProofImage"][0];
  console.log("s3 title이미지 경로 :", challengeTitleImage.location);
  console.log("s3 good이미지 경로 :", goodProofImage.location);
  console.log("s3 bad이미지 경로 :", badProofImage.location);
=======
>>>>>>> Stashed changes
  try {
    const body = req.body;
    const userId = req.user.userId;
    const chgStartDt = new Date(body.chgStartDt);
    const chgEndDt = new Date(body.chgEndDt);
    const challengeTerm = Math.ceil((chgEndDt.getTime()-chgStartDt.getTime())/(1000*3600*24)) * body.proofCountOneDay;
    const challengeTitleImage = req.files["challengeTitleImage"][0];
    const goodProofImage = req.files["goodProofImage"][0];
    const badProofImage = req.files["badProofImage"][0];
    console.log("s3 title이미지 경로 :", challengeTitleImage.location);
    console.log("s3 good이미지 경로 :", goodProofImage.location);
    console.log("s3 bad이미지 경로 :", badProofImage.location);
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.createChallenge, [
        body.challengeTitle,
        body.challengeCategory,
        body.licenseId,
        body.scheduleId,
        user,
        body.proofMethod,
        body.proofAvailableDay,
        body.proofCount,
        body.proofCountOneDay,
        chgStartDt,
        chgEndDt,
        challengeTerm,
        challengeTitleImage.location,
        body.challengeIntroduction,
        goodProofImage.location,
        badProofImage.location,
        body.deposit,
        body.limitPeople
      ]);
      //return res.json(data[0]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'create challenge'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    let { challengeId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(challengeQuery.deleteChallenge, [
        challengeId,
      ]);
      return res.status(200).json({
        code: 200,
        success: true,
        message: 'delete challenge'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};



