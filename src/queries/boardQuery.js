export const get30Board = "SELECT * FROM license_challenge.board WHERE category = ? LIMIT ";
export const getBoard = "SELECT * FROM license_challenge.board WHERE boardId = ?";
export const createBoard = "INSERT INTO license_challenge.board (boardId, userId, category, title, content, createDt, image, editDt, reportCnt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteBoard = "DELETE FROM license_challenge.board where boardId = ?";

export const getComment = "SELECT * FROM license_challenge.board_comment WHERE boardId = ?";
export const createComment = "INSERT INTO license_challenge.board_comment (commentId, boardId, userId, content, createDt, editDt, level, precedingComment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM license_challenge.board_comment where boardId = ? AND commentId = ?";
