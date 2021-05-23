export const getFreeBoard = "SELECT boardId, user.nickname, title, left(content,40) as 'content', createDt, image, reportCnt FROM board, user WHERE board.userId = user.userId AND category = 'freeboard' ORDER BY createDt DESC LIMIT ";
export const getSaleBoard = "SELECT b.boardId, u.nickname, b.title, left(b.content,40) as 'content', b.createDt, b.image, b.reportCnt, af.price FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.category = 'saleboard' ORDER BY createDt DESC LIMIT ";
export const getFreeBoardDetail = "SELECT boardId, user.nickname, user.profileImage, title, content, createDt, image, reportCnt FROM board, user WHERE boardId = ? AND user.userId = board.userId";
export const getSaleBoardDetail = "SELECT b.boardId, u.nickname, u.profileImage, b.title, b.content, b.createDt, b.image, b.reportCnt, af.previewFile, af.allFile, af.price FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.boardId = ?";

export const createFreeBoard = "INSERT INTO board (userId, category, title, content, image) VALUES (?, 'freeboard', ?, ?, ?)";
export const createSaleBoard = "INSERT INTO board (userId, category, title, content, image) VALUES (?, 'saleboard', ?, ?, ?)";
export const createAttachedFile = "INSERT INTO attached_file (boardId, previewFile, allFile, price) VALUES (LAST_INSERT_ID(), ?, ?, ?)";

export const deleteBoard = "DELETE FROM board WHERE boardId = ?";

export const searchBoard = "SELECT * FROM license_challenge.board WHERE concat(title, content) regexp ?;";
export const getBoardsOfWriter = "SELECT * FROM license_challenge.board WHERE userId = ?";
export const getComment = "SELECT * FROM license_challenge.board_comment WHERE boardId = ?";
export const createComment = "INSERT INTO license_challenge.board_comment (boardId, userId, content, level, precedingComment) VALUES (?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM license_challenge.board_comment where boardId = ? AND commentId = ?";
export const updateComment = "UPDATE `license_challenge`.`board_comment` SET `content` = ?, `editDt` = now() WHERE commentId = ?;";
