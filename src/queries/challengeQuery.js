export const getAllChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit FROM challenge, license WHERE challenge.licenseId=license.licenseId LIMIT "
export const getCategoryChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit FROM challenge, license WHERE challenge.licenseId=license.licenseId AND challengeCategory = ? LIMIT "
export const getChallenge = "SELECT challenge.*, license.licenseName FROM challenge, license WHERE challenge.licenseId=license.licenseId AND challengeId = ?;"
export const createChallenge = "INSERT INTO license_challenge.challenge (challengeTitle, challengeCategory, licenseId, scheduleId, leaderId, proofMethod, proofAvailableDay, proofCount, proofCountOneDay, chgStartDt, chgEndDt, challengeTerm, challengeTitleImage, challengeIntroduction, goodProofImage, badProofImage, deposit, limitPeople, joinPeople) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1);"
export const deleteChallenge = "DELETE FROM license_challenge.challenge WHERE challengeId = ?;"
export const getOngoingChallenge = "SELECT challenge.challengeId, challenge.challengeTitle, license.licenseName, challenge.proofCount, challenge.proofCountOneDay, challenge.challengeTerm, challenge.challengeTitleImage, challenge.deposit FROM challenge, license, join_challenge WHERE challenge.licenseId=license.licenseId AND join_challenge.challengeId = challenge.challengeId AND join_challenge.userId=?"