const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchUserByID = (Id) => {
  return db.query(`SELECT * FROM users`).then((response) => {
    const user = response.rows.filter((x) => {
      if (x.username == Id.username) {
        return x;
      }
    });
    if (user.length === 0) {
      return Promise.reject({ status: 404, msg: "Article not found" });
    } else {
      return user;
    }
  });
};
