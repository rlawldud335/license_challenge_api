import { mysqlConn } from "../db";
const licenseScheduleQuery = require("../queries/licenseScheduleQuery");

export const getLicenseSchedule = async (req, res) => {
  try {
    let { licenseId } = req.params;
    await mysqlConn(async (conn) => {
      const [data, schema] = await conn.query(licenseScheduleQuery.getLicenseSchedule, [
        licenseId,
      ]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
