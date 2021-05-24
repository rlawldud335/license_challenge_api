export const chargePoint = "INSERT INTO point_log(userId, type, price, balance) VALUES (?, '충전', ?, (SELECT point FROM user WHERE userId=?)+?);"
export const plusBalance = "UPDATE user SET point = point+? WHERE userId = ?"
export const minusBalance = "UPDATE user SET point = point-? WHERE userId = ?"
export const getPoint = "SELECT userId,point FROM user WHERE userId=?"
export const withdrawPoint = "INSERT INTO point_log(userId, type, price, balance) VALUES (?, '출금', ?, (SELECT point FROM user WHERE userId=?)-?)"
export const usePoint = "INSERT INTO point_log(userId, type, paymentTargetId, price, balance) VALUES (?, ?, ?, ?, (SELECT point FROM user WHERE userId=?)-?)"
export const earnPoint = "INSERT INTO point_log(userId, type, paymentTargetId, price, balance) VALUES (?, ?, ?, ?, (SELECT point FROM user WHERE userId=?)+?)"
export const getPointHistory = "SELECT * FROM point_log WHERE userId=? ORDER BY dealDt DESC LIMIT "

////////////주문정보///////////////////
export const requestPayment = "INSERT INTO payments (merchant_uid, amount, checksum, pay_method, buyerId) VALUES (?,?,?,?,?)"
export const successPayment = "UPDATE payments SET staus = 'success' WHERE merchant_uid = ?"