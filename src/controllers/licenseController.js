import { mysqlConn } from "../db";
const licenseQuery = require("../queries/licenseQuery");

export const getManyLicense = async (req, res) => {
  try {
    const {
      query: { pageNum, numOfRows },
    } = req;
    await mysqlConn(async (conn) => {
      const query = licenseQuery.getManyLicense + pageNum * numOfRows + "," + numOfRows;
      const [data, schema] = await conn.query(query);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getLicense = async (req, res) => {
  try {
    let { licenseId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(licenseQuery.getLicense, [
        licenseId,
      ]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const searchLicense = async (req, res) => {
  try {
    const {
      query: { keyword },
    } = req;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(licenseQuery.searchLicense, [keyword]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
