export const getFreeBoard = "SELECT boardId, user.nickname, title, left(content,40) as 'content', createDt, image, reportCnt FROM board, user WHERE board.userId = user.userId AND category = 'freeboard' LIMIT ";
export const getSaleBoard = "SELECT b.boardId, u.nickname, b.title, left(b.content,40) as 'content', b.createDt, b.image, b.reportCnt, af.price FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.category = 'saleboard' LIMIT ";
export const getFreeBoardDetail = "SELECT boardId, user.nickname, title, content, createDt, image, reportCnt FROM board, user WHERE boardId = ? AND user.userId = board.userId";
export const getSaleBoardDetail = "SELECT b.boardId, u.nickname, b.title, b.content, b.createDt, b.image, b.reportCnt, af.previewFile, af.allFile, af.price FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.boardId = ?";

export const createFreeBoard = "INSERT INTO board (userId, category, title, content, image) VALUES (?, ?, ?, ?, ?)";
export const createSaleBoard = "INSERT INTO board (userId, category, title, content, image) VALUES (?, ?, ?, ?, ?) AND INSERT INTO attached_file () VALUES ()";

export const deleteFreeBoard = "DELETE b, bc FROM board b INNER JOIN board_comment bc WHERE b.boardId = ? AND b.boardId = bc.boardId";
export const deleteSaleBoard = "DELETE b, bc, af FROM board b INNER JOIN board_comment bc INNER JOIN attached_file af WHERE b.boardId = ? AND b.boardId = bc.boardId AND b.boardId = af.boardId"

export const searchBoard = "SELECT * FROM license_challenge.board WHERE concat(title, content) regexp ?;"

export const getComment = "SELECT * FROM license_challenge.board_comment WHERE boardId = ?";
export const createComment = "INSERT INTO license_challenge.board_comment (commentId, boardId, userId, content, createDt, editDt, level, precedingComment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM license_challenge.board_comment where boardId = ? AND commentId = ?";
