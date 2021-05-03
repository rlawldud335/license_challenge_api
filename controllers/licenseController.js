import { mysqlconn, mgconn } from "../db";
const licenseQuery = require("../queries/licenseQuery");

export const getAllLicense = async (req, res) => {
    try {
      const conn = await mysqlconn.getConnection(async (conn) => conn);
      const data = await conn.query(licenseQuery.getAllLicense);
      const rows = data[0];
      return res.json(rows);
    } catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
};

export const getLicense = async (req, res) => {
    let { licenseId } = req.params;
    try {
      const conn = await mysqlconn.getConnection(async (conn) => conn);
      const data = await conn.query(licenseQuery.getLicense, [licenseId]);
      const rows = data[0];
      return res.json(rows[0]);
    } catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
};