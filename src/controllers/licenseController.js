import { mysqlConn } from "../db";
const licenseQuery = require("../queries/licenseQuery");

export const get30License = async (req, res) => {
  try {
    const {
      params: { pageNum },
    } = req;
    await mysqlConn(async (conn) => {
      const query = licenseQuery.get30License + (pageNum - 1) * 30 + ",30";
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
