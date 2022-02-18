const { query } = require("../db/connection");
const db = require("../db/connection");

exports.postCommentModel = (id, body) => {
  return db
    .query(
      `
    INSERT INTO comments 
    (body,author,article_id) 
    VALUES
    ($1,$2,$3)
    RETURNING*`,
      [body.body, body.username, id.id]
    )
    .then((response) => {
      console.log(response);
      if (response.rows.length != 1) {
        console.log("hello");
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return response.rows[0];
    });
};
