export const getAllChallenge = "SELECT * FROM license_challenge.challenge;"
export const getChallenge = "SELECT * FROM license_challenge.challenge WHERE challengeId = ?;"
export const createChallenge = "INSERT INTO license_challenge.challenge (challengeId, challengeTitle, challengeCategory, scheduleId, leaderId, proofMethod, proofCount, proofCountOneDay, chgStartDt, chgEndDt, challengeTerm, challengeTitleImage, challengeInroduction, gooProofImage, badProofImage, challengeCreateDt, deposit, limitPeople, joinPeople) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
export const deleteChallenge = "DELETE FROM license_challenge.challenge WHERE challengeId = ?;"