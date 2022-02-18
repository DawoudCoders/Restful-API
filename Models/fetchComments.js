const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchComments = (id) => {

  db.query("SELECT", [id.article_id]).then((response) => {
    console.log(response);
    return response.rows;
  });
};
