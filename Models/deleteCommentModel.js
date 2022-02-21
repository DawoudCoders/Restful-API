const { query } = require("../db/connection");
const db = require("../db/connection");

exports.deleteCommentModel = (id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING*", [
      id.comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      }
    });
};
