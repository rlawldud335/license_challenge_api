export const getCategoryBoard = "SELECT * FROM license_challenge.board WHERE category = ? LIMIT ";
export const getBoard = "SELECT * FROM license_challenge.board WHERE boardId = ?";
export const createBoard = "INSERT INTO license_challenge.board (userId, category, title, content, image) VALUES (?, ?, ?, ?, ?)";
export const deleteBoard = "DELETE FROM license_challenge.board WHERE boardId = ?";
export const searchBoard = "SELECT * FROM license_challenge.board WHERE concat(title, content) regexp ?;"

export const getComment = "SELECT * FROM license_challenge.board_comment WHERE boardId = ?";
export const createComment = "INSERT INTO license_challenge.board_comment (boardId, userId, content, level, precedingComment) VALUES (?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM license_challenge.board_comment where boardId = ? AND commentId = ?";
