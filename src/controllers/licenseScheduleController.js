import { mysqlconn, mgconn } from "../db";
const licenseScheduleQuery = require("../queries/licenseScheduleQuery");

export const getLicenseSchedule = async (req, res) => {
  let { scheduleId } = req.params;
  try {
    const conn = await mysqlconn.getConnection(async (conn) => conn);
    const data = await conn.query(licenseScheduleQuery.getLicenseSchedule, [
      scheduleId,
    ]);
    const rows = data[0];
    return res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  } finally {
    conn.release();
  }
};
