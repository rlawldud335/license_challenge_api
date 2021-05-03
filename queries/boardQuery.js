export const getAllBoard = "SELECT * FROM board";
export const getBoard = "SELECT * FROM board WHERE boardId = ?";
export const createBoard = "INSERT INTO board (boardId, userId, category, title, content, createDt, image, editDt, reportCnt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteBoard = "DELETE FROM board where boardId = ?";