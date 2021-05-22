export const getCategoryBoard = "SELECT boardId, user.nickname, title, left(content,40) as 'content', createDt, image, reportCnt FROM board, user WHERE board.userId = user.userId AND category = ? LIMIT ";
export const getBoard = "SELECT boardId, user.nickname, title, content, createDt, image, reportCnt FROM board, user WHERE boardId = ? AND user.userId = board.userId";
export const createBoard = "INSERT INTO license_challenge.board (userId, category, title, content, image) VALUES (?, ?, ?, ?, ?)";
export const deleteBoard = "DELETE FROM license_challenge.board WHERE boardId = ?";

export const getComment = "SELECT * FROM license_challenge.board_comment WHERE boardId = ?";
export const createComment = "INSERT INTO license_challenge.board_comment (commentId, boardId, userId, content, createDt, editDt, level, precedingComment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM license_challenge.board_comment where boardId = ? AND commentId = ?";
