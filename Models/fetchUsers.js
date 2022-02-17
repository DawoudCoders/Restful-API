const { query } = require("../db/connection");
const db = require("../db/connection");

exports.fetchUsers = () => {
    return db.query("SELECT username FROM users").then((response) => {
      return response.rows;
    });
  };
  