const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchArticleById = (Id) => {
  return db
    .query(
      `SELECT articles.*,
      COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1 
      GROUP BY articles.article_id;`,
      [Id.id]
    )
    .then((response) => {
      console.log("hello");
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      } else {
        return response.rows;
      }
    });
};
