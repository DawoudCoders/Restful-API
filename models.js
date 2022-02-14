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
      return response;
    });
};
