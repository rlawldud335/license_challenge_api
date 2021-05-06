export const getAllBoard = "SELECT * FROM board";
export const getBoard = "SELECT * FROM board WHERE boardId = ?";
export const createBoard = "INSERT INTO board (boardId, userId, category, title, content, createDt, image, editDt, reportCnt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteBoard = "DELETE FROM board where boardId = ?";

export const getComment = "SELECT * FROM board_comment WHERE boardId = ?";
export const createComment = "INSERT INTO board_comment (commentId, boardId, userId, content, createDt, editDt, level, precedingComment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM board_comment where boardId = ? AND commentId = ?";
