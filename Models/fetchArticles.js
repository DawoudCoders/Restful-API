const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchArticles = () => {
  return db
    .query(
      "SELECT author, title, article_id, topic, created_at, votes FROM articles ORDER BY created_at ASC;"
    )
    .then(({ rows }) => {
      return rows;
    });
};
