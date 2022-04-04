const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchArticles = (sort_by = "created_at", order = "ASC", topic) => {

  const validSortBys = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
  ];
  const validOrderBys = ["ASC", "DESC"];

  if (!validSortBys.includes(sort_by) || !validOrderBys.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes,
COUNT(comments.comment_id) AS comment_count
FROM articles
LEFT JOIN comments ON comments.article_id = articles.article_id`;

let queryValues = [];
  if (topic) {
    queryStr += " WHERE topic = $1";
    queryValues.push(topic)
  }

  queryStr += ` GROUP BY articles.article_id
ORDER BY articles.${sort_by} ${order};`;

  return db.query(queryStr,queryValues).then(({ rows }) => {
    return rows;
  });
};
