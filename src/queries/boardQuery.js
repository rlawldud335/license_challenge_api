export const getFreeBoard = "SELECT boardId, user.nickname, title, left(content,40) as 'content', createDt, image, reportCnt FROM board, user WHERE board.userId = user.userId AND category = 'freeboard' ORDER BY createDt DESC LIMIT ";
export const getSaleBoard = "SELECT b.boardId, u.nickname, b.title, left(b.content,40) as 'content', b.createDt, b.image, b.reportCnt, af.price FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.category = 'saleboard' ORDER BY createDt DESC LIMIT ";
export const getFreeBoardDetail = "SELECT boardId, user.profileImage, user.nickname, category, title, content, createDt, image, reportCnt FROM board, user WHERE boardId = ? AND user.userId = board.userId";
export const getSaleBoardPurchaser = "SELECT af.fileId, af.price, af.previewFile, af.allFile FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.boardId = ?";
export const getSaleBoardNoPurchaser = "SELECT af.fileId, af.price, af.previewFile FROM board b left JOIN user u ON b.userId = u.userId right JOIN attached_file af ON b.boardId = af.boardId WHERE b.boardId = ?";
export const getPurchaser = "SELECT purchaser FROM attached_file WHERE boardId = ?";

export const createFreeBoard = "INSERT INTO board (userId, category, title, content, image) VALUES (?, 'freeboard', ?, ?, ?)";
export const createSaleBoard = "INSERT INTO board (userId, category, title, content, image) VALUES (?, 'saleboard', ?, ?, ?)";
export const createAttachedFile = "INSERT INTO attached_file (boardId, previewFile, allFile, price, purchaser) VALUES (?, ?, ?, ?, ?)";

export const updateBoard = "UPDATE board SET title=?, content=?, image=?, editDt=now() WHERE boardId = ?";
export const updateAttachedFile = "UPDATE attached_file SET previewFile=?, allFile=?, price=? WHERE boardId = ?";

export const deleteBoard = "DELETE FROM board WHERE boardId = ?";

export const purchaser = "SELECT purchaser FROM attached_file WHERE fileId = ?";
export const purchaserId = "SELECT CONCAT(purchaser, ?) AS purchaserId FROM attached_file WHERE fileId = ?";
export const purchaseFile = "UPDATE attached_file SET purchaser = ? WHERE fileId = ?";

export const searchBoard = "SELECT * FROM license_challenge.board WHERE concat(title, content) regexp ? ORDER BY createDt DESC;";
export const getBoardsOfWriter = "SELECT * FROM license_challenge.board WHERE userId = ? ORDER BY createDt DESC";
export const getComment = "SELECT commentId, boardId, u.nickname, content, createDt, editDt, level, precedingComment FROM board_comment bc, user u WHERE boardId = ? AND bc.userId = u.userId";
export const createComment = "INSERT INTO license_challenge.board_comment (boardId, userId, content, level, precedingComment) VALUES (?, ?, ?, ?, ?)";
export const deleteComment = "DELETE FROM license_challenge.board_comment where boardId = ? AND commentId = ?";
export const updateComment = "UPDATE `license_challenge`.`board_comment` SET `content` = ?, `editDt` = now() WHERE commentId = ?";