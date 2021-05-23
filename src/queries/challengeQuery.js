export const getAllChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit FROM challenge, license WHERE challenge.licenseId=license.licenseId LIMIT "
export const getCategoryChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit FROM challenge, license WHERE challenge.licenseId=license.licenseId AND challengeCategory = ? LIMIT "
export const getChallenge = "SELECT challenge.*, license.licenseName FROM challenge, license WHERE challenge.licenseId=license.licenseId AND challengeId = ?;"
export const createLicenseChallenge = "INSERT INTO license_challenge.challenge (challengeTitle, challengeCategory, licenseId, leaderId, proofMethod, proofAvailableDay, proofCount, proofCountOneDay, chgStartDt, chgEndDt, challengeTerm, challengeTitleImage, challengeIntroduction, goodProofImage, badProofImage, deposit, limitPeople, joinPeople) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1);"
export const createOtherChallenge = "INSERT INTO license_challenge.challenge (challengeTitle, challengeCategory, leaderId, proofMethod, proofAvailableDay, proofCount, proofCountOneDay, chgStartDt, chgEndDt, challengeTerm, challengeTitleImage, challengeIntroduction, goodProofImage, badProofImage, deposit, limitPeople, joinPeople) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1);"
export const deleteChallenge = "DELETE FROM license_challenge.challenge WHERE challengeId = ?;"
export const getOngoingChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit , challenge.chgStartDt,  challenge.chgEndDt FROM challenge, license, join_challenge WHERE challenge.licenseId=license.licenseId AND join_challenge.challengeId = challenge.challengeId AND join_challenge.userId=? AND challenge.chgEndDt >= date(now())"
export const getEndedChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit , challenge.chgStartDt,  challenge.chgEndDt FROM challenge, license, join_challenge WHERE challenge.licenseId=license.licenseId AND join_challenge.challengeId = challenge.challengeId AND join_challenge.userId=? AND challenge.chgEndDt < date(now())"
export const searchChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.challengeIntroduction, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit , challenge.chgStartDt,  challenge.chgEndDt FROM challenge, license WHERE  challenge.licenseId=license.licenseId AND concat(challenge.challengeTitle, license.licenseName, challenge.challengeIntroduction) regexp ?"
export const getAchievementRate = "SELECT challenge.challengeId, challenge.challengeTitle, challenge.challengeTerm, join_challenge.successCnt, join_challenge.failCnt, ROUND((join_challenge.successCnt/challenge.challengeTerm)*100) AS achievement_rate FROM challenge, join_challenge WHERE join_challenge.challengeId = challenge.challengeId AND join_challenge.userId=? AND challenge.challengeId=?"
