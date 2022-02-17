const { query } = require("../db/connection");
const db = require("../db/connection");

exports.patchArticleModel = (body, params) => {
  return db
    .query(
      "UPDATE articles SET votes = (votes + $1) WHERE article_id = $2 RETURNING*",
      [body.inc_votes, params.id]
    )
    .then(({ rows }) => {
      if (rows.length == 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      } else {
        console.log(rows);
        return rows[0];
      }
    });
};
