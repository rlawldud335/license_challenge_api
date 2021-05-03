export const getAllBoard = "SELECT * FROM board";
export const getBoard = "SELECT * FROM board WHERE boardId = ?";
export const insertBoard = "INSERT INTO board (boardId, userId, category, title, content, createDt, reportCnt) VALUES (?, ?, ?, ?, ?, ?, ?);"
export const deleteBoard = "DELETE FROM board where boardId = ?";