const { query } = require("../db/connection");
const db = require("../db/connection");

exports.deleteCommentModel = (id) => {
  return db.query("DELETE FROM comments WHERE comment_id = $1", [
    id.comment_id,
  ]);
};
