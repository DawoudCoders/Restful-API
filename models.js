const { query } = require("./db/connection");
const db = require("./db/connection");

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics").then((response) => {
    return response;
  });
};

exports.fetchArticleById = (Id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [Id.id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found" });
      } else {
        return response.rows;
      }
    });
};

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

exports.fetchUsers = () => {
  return db.query("SELECT * FROM users").then((response) => {
    return response.rows;
  });
};

exports.fetchArticles = () => {
  const author = "author";
  const title = "title";
  const article_id = "article_id";
  const topic = "topic";
  const created_at = "created_at";
  const votes = "votes";
  return db
    .query(
      "SELECT author, title, article_id, topic, created_at, votes FROM articles;"
    )
    .then(({ rows }) => {
      return rows;
    });
};
