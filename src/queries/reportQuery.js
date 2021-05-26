export const reportBoard = "UPDATE `license_challenge`.`board` SET `reportCnt` = `reportCnt`+1 WHERE `boardId` = ?;"
export const reportBadProof = "UPDATE `license_challenge`.`proof_picture` SET `reportCnt` = `reportCnt`+1 WHERE `pictureId` = ?;"

export const getReportLog = "SELECT * FROM license_challenge.report_log LIMIT "
export const intoReportLog = "INSERT INTO `license_challenge`.`report_log` (`suspecterId`, `reporterId`, `proofImageId`, `boardId`, `reportReason`, `reportDt`) VALUES (?,?,?,?,?,now());"