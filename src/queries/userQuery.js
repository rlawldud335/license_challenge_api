export const getUserInfo = "SELECT userId, email, nickname, phoneNumber, profileImage, point, joinDt FROM `user` WHERE `userId`=?";
export const updateUserInfo = "UPDATE `user` SET `nickname`=?, `password`=?, `phoneNumber`=?, `profileImage`=?  WHERE `userId`=?";
export const deleteUser = "DELETE FROM `user` WHERE `userId` = ?";