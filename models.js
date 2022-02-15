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
