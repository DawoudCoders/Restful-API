const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchComments = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1; `, [id.article_id])
    .then((response) => {
      if(response.rows.length === 0){ return Promise.reject({ status: 404, msg: "article not found" });}
      return response.rows;
    });
};
