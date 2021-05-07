import { mysqlconn } from "../db";
import licenseScheduleQuery from "../queries/licenseScheduleQuery";

export const getLicenseSchedule = async (req, res) => {
  try {
    let { scheduleId } = req.params;
    await mysqlConn(async (conn) => {
      const [
        data,
        schema,
      ] = await conn.query(licenseScheduleQuery.getLicenseSchedule, [
        scheduleId,
      ]);
      return res.status(200).json(data);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
