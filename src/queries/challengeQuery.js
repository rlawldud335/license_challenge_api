export const getJoinPeopleList = "SELECT nickname, profileImage FROM user, join_challenge J WHERE challengeId=? And user.userId=J.userId";

export const getAllChallenge = "\
    SELECT      challengeId, challengeTitle, challenge.challengeCategory, licenseName, proofCount, proofCountOneDay, proofAvailableDay, challengeTitleImage, deposit, chgStartDt, chgEndDt, challengeCreateDt \
    FROM        challenge \
        LEFT JOIN license ON(challenge.licenseId = license.licenseId) \
    WHERE       chgStartDt>=curdate() \
    ORDER BY    challengeCreateDt DESC LIMIT "

export const getCategoryChallenges = "\
    SELECT      challengeId, challengeTitle, challenge.challengeCategory, licenseName, proofCount, proofCountOneDay, proofAvailableDay, challengeTitleImage, deposit, chgStartDt, chgEndDt, challengeCreateDt \
    FROM        challenge LEFT JOIN license ON(challenge.licenseId = license.licenseId) \
    WHERE       chgStartDt>=curdate() AND challengeCategory LIKE ? \
    ORDER BY    challengeCreateDt DESC LIMIT "

export const getOneChallenge = "\
    SELECT      C.*, user.nickname AS 'leaderName', user.profileImage AS 'leaderProfileImage' \
    FROM        (SELECT challenge.*, licenseName FROM challenge LEFT JOIN license ON(challenge.licenseId = license.licenseId)) C, user \
    WHERE       challengeId=? AND C.leaderId=user.userId"

export const createLicenseChallenge = "\
    INSERT INTO challenge (challengeTitle, challengeCategory, licenseId, leaderId, proofMethod, proofAvailableDay, proofCount, proofCountOneDay, chgStartDt, chgEndDt, challengeTitleImage, challengeIntroduction, goodProofImage, badProofImage, deposit, limitPeople, balance_deposit) \
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

export const createOtherChallenge = "\
    INSERT INTO challenge (challengeTitle, challengeCategory, leaderId, proofMethod, proofAvailableDay, proofCount, proofCountOneDay, chgStartDt, chgEndDt, challengeTitleImage, challengeIntroduction, goodProofImage, badProofImage, deposit, limitPeople, joinPeople) \
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1);"

export const updateChallenge = "\
    UPDATE challenge \
    SET challengeTitle= ?, proofMethod = ?, proofAvailableDay = ?, proofCount = ?, proofCountOneDay = ?, challengeTitleImage = ?, challengeIntroduction = ?, goodProofImage= ?, badProofImage = ?, limitPeople= ? WHERE challengeId = ?"
export const deleteChallenge = "DELETE FROM challenge WHERE challengeId = ?;"

export const getOngoingChallenge = "\
    SELECT      C.challengeId, C.challengeTitle, C.licenseId, C.licenseName, C.challengeCategory, C.proofCount, C.proofCountOneDay, C.proofAvailableDay, C.challengeTitleImage, C.deposit , C.chgStartDt,  C.chgEndDt, C.challengeCreateDt, \
                IFNULL(ROUND((J.successCnt/(J.successCnt+J.failCnt))*100),0) AS achievement_rate  \
    FROM        join_challenge J , (SELECT challenge.*, licenseName FROM challenge LEFT JOIN license ON(challenge.licenseId = license.licenseId)) C \
    WHERE       J.challengeId = C.challengeId AND J.userId=? AND C.chgEndDt >= date(now()) \
    ORDER BY    challengeCreateDt DESC"

export const getEndedChallenge = "\
    SELECT      C.challengeId, C.challengeTitle, C.licenseId, C.licenseName, C.challengeCategory, C.proofCount, C.proofCountOneDay, C.proofAvailableDay, C.challengeTitleImage, C.deposit , C.chgStartDt,  C.chgEndDt, C.challengeCreateDt, \
                IFNULL(ROUND((J.successCnt/(J.successCnt+J.failCnt))*100),0) AS achievement_rate  \
    FROM        join_challenge J , (SELECT challenge.*, licenseName FROM challenge LEFT JOIN license ON(challenge.licenseId = license.licenseId)) C \
    WHERE       J.challengeId = C.challengeId AND J.userId=? AND C.chgEndDt < date(now()) \
    ORDER BY    challengeCreateDt DESC"

export const searchChallenge = "\
    SELECT      challengeId, challengeTitle, licenseName,  challengeIntroduction, proofCount, proofCountOneDay, proofAvailableDay, challengeTitleImage, deposit , chgStartDt, chgEndDt, challengeCreateDt \
    FROM        challenge LEFT JOIN license ON(challenge.licenseId = license.licenseId) \
    WHERE       concat(challengeTitle, licenseName, challengeIntroduction) regexp ? \
    ORDER BY    challengeCreateDt DESC LIMIT "

export const getAchievementRate = "\
    SELECT      C.challengeId, C.challengeTitle, J.successCnt, J.failCnt, \
                IFNULL(ROUND((J.successCnt/(J.successCnt+J.failCnt))*100),0) AS achievement_rate, \
                J.pass, J.passImage \
    FROM        challenge C, join_challenge J \
    WHERE       J.challengeId = C.challengeId AND J.userId=? AND C.challengeId=?"

export const enterChallenge_leader = "INSERT INTO join_challenge(challengeId, userId, successCnt, failCnt, pass) VALUES (?,?,0,0,0)"
export const enterChallenge_challenger = "INSERT INTO join_challenge(challengeId, userId, successCnt, failCnt, pass) VALUES (?,?,0,0,0);"
export const plusJoinPeople = "UPDATE challenge SET joinPeople = joinPeople+1, balance_deposit = balance_deposit+deposit WHERE challengeId = ?;"
export const getChallengeEndDt = "SELECT chgEndDt FROM challenge WHERE challengeId=?"
export const createProofPicture = "INSERT INTO proof_picture(challengeId, userId, proofImage, dailyReview, reportCnt, proof) VALUES(?, ?, ?, ?, 0, 0)"
export const getProofPicture = "SELECT pictureId, proofImage FROM proof_picture WHERE challengeId = ? ORDER BY proofDt DESC LIMIT "

export const getProofPictureDetail = "\
    SELECT pp.pictureId, pp.proofImage, u.profileImage, u.nickname, pp.dailyReview, pp.proofDt, pp.reportCnt \
    FROM proof_picture pp, user u \
    WHERE pp.userId = u.userId AND pp.challengeId = ? AND pp.pictureId = ?"


export const getToday = "SELECT case DAYOFWEEK(CURDATE()) when '1' then '일' when '2' then '월' when '3' then '화' when '4' then '수' when '5' then '목' when '6' then '금' when '7' then '토' end as dayofweek"
export const getProofAvailableDay = "SELECT proofAvailableDay from challenge where challengeId = ?"
export const getProofCntOneDay = "SELECT proofCountOneDay FROM challenge WHERE challengeId = ?"
export const getProofCnt = "SELECT proofCount from challenge where challengeId = ?"
export const getUserDayCnt = "SELECT COUNT(*) AS userDayCnt FROM proof_picture WHERE challengeId = ? AND userId = ? AND date(proofDt) >= date(curdate())"
export const getUserWeekCnt = "SELECT COUNT(*) AS userWeekCnt FROM proof_picture WHERE date_format(proofDt,'%Y-%m-%d') BETWEEN (SELECT ADDDATE(CURDATE(), - WEEKDAY(CURDATE()) + 0 )) AND (SELECT ADDDATE(CURDATE(), - WEEKDAY(CURDATE()) + 6 )) AND challengeId = ? AND userId = ?"
export const updateSuccessCnt = "UPDATE join_challenge SET successCnt = successCnt + 1 WHERE challengeId = ? AND userId = ?"
export const updateProof = "UPDATE proof_picture SET proof = 1 WHERE challengeId = ? AND userId = ?"

export const getYesterday = "SELECT case DAYOFWEEK(CURDATE()-1) when '1' then '일' when '2' then '월' when '3' then '화' when '4' then '수' when '5' then '목' when '6' then '금' when '7' then '토' end as dayofweek"
export const getYdayChallenge = "SELECT join_challenge.challengeId, join_challenge.userId FROM challenge, join_challenge WHERE challenge.challengeId = join_challenge.challengeId AND challenge.proofAvailableDay LIKE ?"
export const getUserYdayCnt = "SELECT COUNT(*) AS userYdayCnt FROM proof_picture WHERE challengeId = ? AND userId = ? AND date(proofDt) = date(curdate()-1)"
export const updateFailCnt = "UPDATE join_challenge SET failCnt = failCnt + 1 WHERE challengeId = ? AND userId = ?"
export const deleteProofImage = "DELETE FROM proof_picture WHERE challengeId = ? AND userId = ?"


/////////////환급//////////////
//export const checkDepositRefund = "SELECT pass, refund_deposit, achievement_rate, ( CASE WHEN 80 <= achievement_rate THEN 100 WHEN  50 <= achievement_rate AND achievement_rate < 80 THEN achievement_rate WHEN achievement_rate < 50 THEN 0 ELSE -1 END ) AS refund_rate FROM join_challenge, (SELECT IFNULL(ROUND((join_challenge.successCnt/(join_challenge.successCnt+join_challenge.failCnt))*100),0) AS achievement_rate FROM join_challenge WHERE userId = ? AND challengeId = ?) B WHERE userId = ? AND challengeId = ?"
export const getEndedCLG = "SELECT challengeId, deposit, refund FROM challenge WHERE challenge.chgEndDt < date(now()) AND refund=0"

export const getEndedUsers = "\
    SELECT  distinct userId, refund_deposit, \
            IFNULL(ROUND((join_challenge.successCnt/(join_challenge.successCnt+join_challenge.failCnt))*100),0) AS achievement_rate \
    FROM    join_challenge \
    WHERE   challengeId = ?"

export const successDepositRefund = "UPDATE join_challenge SET refund_deposit = 1 WHERE challengeId = ? AND userId = ?"
export const successDepositRefund2 = "UPDATE challenge SET refund = 1, balance_deposit = balance_deposit-? WHERE challengeId = ?"
export const successBonusRefund = "UPDATE join_challenge SET refund_bonus = 1 WHERE challengeId = ? AND userId = ?"

export const checkBonus = "\
    SELECT  refund_bonus, IF((pass = 1 AND achievement_rate>95) OR achievement_rate =100 ,1,0) AS bonus_check \
    FROM    (SELECT *, IFNULL(ROUND((join_challenge.successCnt/(join_challenge.successCnt+join_challenge.failCnt))*100),0) AS achievement_rate \
            FROM join_challenge \
            WHERE userId = ? AND challengeId = ?) B"

export const countBonusUsers = "\
    SELECT COUNT(*) AS count \
    FROM join_challenge \
    WHERE challengeId=? AND ((pass = 1 AND ROUND((successCnt/(successCnt+failCnt))*100) > 95) OR (successCnt/(successCnt+failCnt))*100=100)"

export const getDepositBalance = "SELECT refund, balance_deposit FROM challenge WHERE challengeId=?"


///////////challenge Info///////////
export const countAllchallengers = "SELECT COUNT(*) AS all_challengers FROM join_challenge WHERE challengeId = ?"
export const countPasschallengers = "SELECT COUNT(*) AS pass_challengers FROM join_challenge WHERE challengeId = ? AND pass=1"
export const getDailyProofSuccess = "SELECT challengeId, userId FROM proof_picture WHERE challengeId= 64 AND proofDt > CURDATE( ) AND proof=0 GROUP BY challengeId, userId HAVING COUNT(*) >= ?"

export const getAchievementStatistics = "\
    SELECT \
        COUNT(CASE WHEN  0<= achievement_rate AND achievement_rate <= 20 THEN 1 END) AS 'to20', \
        COUNT(CASE WHEN  20< achievement_rate AND achievement_rate <= 40 THEN 1 END) AS 'to40', \
        COUNT(CASE WHEN  40< achievement_rate AND achievement_rate <= 60 THEN 1 END) AS 'to60', \
        COUNT(CASE WHEN  60< achievement_rate AND achievement_rate <= 80 THEN 1 END) AS 'to80', \
        COUNT(CASE WHEN achievement_rate > 80 THEN 1 END) AS 'to100' \
    FROM (SELECT challengeId, userId, ROUND(IFNULL((successCnt/(successCnt+failCnt)*100),0)) AS achievement_rate FROM join_challenge WHERE challengeId = ?) A"